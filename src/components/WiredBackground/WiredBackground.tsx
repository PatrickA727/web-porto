import { useEffect, useRef } from 'react';
import { createNoiseField } from './noise';
import {
  PANEL_CONFIGS,
  MIN_PANELS,
  MAX_PANELS,
  type PanelConfig,
} from './panels';
import {
  drawNoiseFrame,
  initMatrixGrid,
  gridToString,
  flickerGrid,
  generateAsciiCluster,
  buildSysInfo,
  buildIDE,
  buildSearch,
  buildQuotePanel,
  buildCoplandLogin,
  type MatrixGrid,
} from './content';
import { runBootSequence } from './boot';
import './WiredBackground.css';

interface ActivePanel {
  div: HTMLDivElement;
  refreshTimer?: number;
  despawnTimer?: number;
  cleanup?: () => void;
}

export default function WiredBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- background canvas ---
    const wrap = canvas.parentElement as HTMLElement;
    const resize = () => {
      canvas.width = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const field = createNoiseField();
    let t = 0;
    let rafId = 0;
    const loop = () => {
      drawNoiseFrame(ctx, field, t);
      t++;
      rafId = requestAnimationFrame(loop);
    };
    loop();

    // --- panel system ---
    const activePanels = new Map<PanelConfig, ActivePanel>();

    function buildContent(cfg: PanelConfig): {
      content: HTMLDivElement;
      grid?: MatrixGrid;
    } {
      const content = document.createElement('div');
      content.style.marginTop = '14px';
      let grid: MatrixGrid | undefined;

      switch (cfg.type) {
        case 'ascii_organic':
          content.className = 'ascii-cluster';
          content.textContent = generateAsciiCluster(cfg.cols ?? 28, cfg.rows ?? 14, '.:cdolEE');
          break;
        case 'sysinfo':
          content.innerHTML = buildSysInfo();
          content.style.whiteSpace = 'normal';
          break;
        case 'charmatrix': {
          content.className = 'charmatrix';
          grid = initMatrixGrid(cfg.cols ?? 28, cfg.rows ?? 18);
          content.textContent = gridToString(grid);
          break;
        }
        case 'search':
          content.innerHTML = buildSearch();
          content.style.whiteSpace = 'normal';
          break;
        case 'ide':
          content.innerHTML = buildIDE();
          content.style.whiteSpace = 'normal';
          content.style.marginTop = '18px';
          break;
        case 'copland_login':
          content.innerHTML = buildCoplandLogin();
          content.style.whiteSpace = 'normal';
          content.style.padding = '0';
          content.style.marginTop = '8px';
          break;
        case 'quote_panel':
          content.innerHTML = buildQuotePanel();
          content.style.whiteSpace = 'normal';
          break;
      }
      return { content, grid };
    }

    function spawnPanel(cfg: PanelConfig): void {
      if (activePanels.has(cfg)) return;

      const div = document.createElement('div');
      div.className = 'panel';
      div.classList.add(`panel-${cfg.type}`);
      if (cfg.type === 'copland_login') div.classList.add('login-panel');
      if (cfg.top) div.style.top = cfg.top;
      if (cfg.left) div.style.left = cfg.left;
      if (cfg.right) div.style.right = cfg.right;
      div.style.width = cfg.width;
      div.style.height = cfg.height;

      const tag = document.createElement('div');
      tag.className = 'corner-tag';
      tag.textContent = cfg.title;
      div.appendChild(tag);

      const { content, grid } = buildContent(cfg);
      div.appendChild(content);
      host!.appendChild(div);

      window.setTimeout(() => {
        div.classList.add('visible');
        if (cfg.transform) div.style.transform = cfg.transform;
      }, 30);

      const entry: ActivePanel = { div };

      if (cfg.type === 'charmatrix' && grid) {
        entry.refreshTimer = window.setInterval(() => {
          flickerGrid(grid);
          content.textContent = gridToString(grid);
        }, 80);
      } else if (cfg.type === 'ascii_organic') {
        entry.refreshTimer = window.setInterval(() => {
          content.textContent = generateAsciiCluster(cfg.cols ?? 28, cfg.rows ?? 14, '.:cdolEE');
        }, 3500);
      } else if (cfg.type === 'copland_login') {
        window.setTimeout(() => {
          const seq = content.querySelector<HTMLElement>('[data-boot-seq]');
          if (seq) entry.cleanup = runBootSequence(seq);
        }, 400);
      }

      activePanels.set(cfg, entry);

      // Persistent panels never despawn.
      if (cfg.persistent) return;

      entry.despawnTimer = window.setTimeout(() => {
        div.classList.remove('visible');
        if (cfg.transform) div.style.transform = cfg.transform + ' scale(0.95)';
        if (entry.refreshTimer) window.clearInterval(entry.refreshTimer);
        window.setTimeout(() => {
          div.remove();
          activePanels.delete(cfg);
          // Respawning is handled centrally by the manager loop.
        }, 500);
      }, cfg.duration ?? 8000);
    }

    // --- manager: keep MIN..MAX ephemeral panels visible ---
    const ephemeralConfigs = PANEL_CONFIGS.filter((c) => !c.persistent);

    const countEphemeralActive = (): number => {
      let n = 0;
      activePanels.forEach((_, cfg) => {
        if (!cfg.persistent) n++;
      });
      return n;
    };

    const spawnRandomEphemeral = (): void => {
      const available = ephemeralConfigs.filter((c) => !activePanels.has(c));
      if (available.length === 0) return;
      const cfg = available[Math.floor(Math.random() * available.length)];
      spawnPanel(cfg);
    };

    // Persistent panels spawn immediately.
    PANEL_CONFIGS.filter((c) => c.persistent).forEach(spawnPanel);
    // Seed one ephemeral so the screen isn't empty.
    spawnRandomEphemeral();

    const managerId = window.setInterval(() => {
      const count = countEphemeralActive();
      if (count < MIN_PANELS) {
        spawnRandomEphemeral();
      } else if (count < MAX_PANELS && Math.random() < 0.4) {
        spawnRandomEphemeral();
      }
    }, 1200);

    // --- cleanup on unmount ---
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      window.clearInterval(managerId);
      activePanels.forEach((entry) => {
        if (entry.refreshTimer) window.clearInterval(entry.refreshTimer);
        if (entry.despawnTimer) window.clearTimeout(entry.despawnTimer);
        if (entry.cleanup) entry.cleanup();
        entry.div.remove();
      });
      activePanels.clear();
    };
  }, []);

  return (
    <div className="wired-fullscreen">
      <canvas ref={canvasRef} className="wired-noise-bg" />
      <div ref={hostRef} className="wired-panels-host" />
    </div>
  );
}
