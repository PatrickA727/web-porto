// Pure content generators for the various panel types.
// These return strings (textContent) or HTML strings (innerHTML) and have
// no DOM side effects, which keeps them easy to reason about and test.

import type { NoiseField } from './noise';
import { COPLAND_ASCII } from './copland';
import { WIRED_QUOTES } from './panels';

// --- organic ascii blob ("wired://signal" style) ---
export function generateAsciiCluster(w: number, h: number, char: string): string {
  const chars = char.split('');
  let out = '';
  for (let y = 0; y < h; y++) {
    let row = '';
    for (let x = 0; x < w; x++) {
      const dx = (x - w / 2) / (w / 2);
      const dy = (y - h / 2) / (h / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      const n = Math.random();
      if (d < 0.85 && n > d * 0.7) row += chars[Math.floor(Math.random() * chars.length)];
      else if (n > 0.85) row += chars[Math.floor(Math.random() * chars.length)];
      else row += ' ';
    }
    out += row + '\n';
  }
  return out;
}

// --- flickering character matrix ---
const MATRIX_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>?/[]{}=+-';

export type MatrixGrid = string[][];

export function initMatrixGrid(cols: number, rows: number): MatrixGrid {
  const grid: MatrixGrid = [];
  for (let r = 0; r < rows; r++) {
    const row: string[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(
        Math.random() > 0.3 ? MATRIX_POOL[Math.floor(Math.random() * MATRIX_POOL.length)] : ' '
      );
    }
    grid.push(row);
  }
  return grid;
}

export function gridToString(grid: MatrixGrid): string {
  return grid.map((row) => row.join(' ')).join('\n');
}

// Mutates the grid in place: flips ~8% of cells for a smooth, alive flicker.
export function flickerGrid(grid: MatrixGrid): void {
  const rows = grid.length;
  const cols = grid[0].length;
  const flips = Math.floor(rows * cols * 0.08);
  for (let i = 0; i < flips; i++) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    grid[r][c] =
      Math.random() > 0.3 ? MATRIX_POOL[Math.floor(Math.random() * MATRIX_POOL.length)] : ' ';
  }
}

// --- neofetch-style system info ---
export function buildSysInfo(): string {
  return `<span class="sysinfo" style="color:#c04070; font-size:12px; letter-spacing:1px;">▓ SYSTEM</span>
<span class="sysinfo">
<span class="k">⌂ Host Entity</span>    <span class="v">~ jarvis.wired</span>
<span class="k">▣ Main Processor</span> <span class="v">~ AMD Ryzen 9 7900X</span>
<span class="k">◈ Visual Unit</span>    <span class="v">~ RTX 4070 Ti</span>
<span class="k">⊙ Core Protocol</span>  <span class="v">~ Arch Linux x86_64</span>
<span class="k">△ Kernel Schema</span>  <span class="v">~ 6.6.1-arch1</span>
<span class="k">▤ Memory Buffer</span>  <span class="v">~ 12.4G / 32G</span>
<span class="k">⌬ Persistent</span>     <span class="v">~ 412G / 1T</span>
<span class="k">▦ Module Count</span>   <span class="v">~ 1247 (pacman)</span>
<span class="k">▷ Command Iface</span>  <span class="v">~ /bin/zsh</span>
<span class="k">⌚ Uptime Synch</span>   <span class="v">~ 4h 12m</span>
<span class="k">◉ WIRED</span>
<span class="k">⌖ Local IP Node</span>  <span class="v">~ 192.168.1.42</span>
<span class="k">▼ Active Profile</span> <span class="v">~ jarvis</span>
</span>`;
}

// --- IDE / vim buffer showing navi.c ---
export function buildIDE(): string {
  const lines = [
    `<span class="c-pp">#include</span> <span class="c-str">&lt;stdio.h&gt;</span>`,
    `<span class="c-pp">#include</span> <span class="c-str">&lt;stdlib.h&gt;</span>`,
    `<span class="c-pp">#include</span> <span class="c-str">&lt;string.h&gt;</span>`,
    `<span class="c-pp">#include</span> <span class="c-str">"wired.h"</span>`,
    ``,
    `<span class="c-cmt">// connect to the wired</span>`,
    `<span class="c-kw">static</span> <span class="c-kw">int</span> <span class="c-fn">navi_init</span>(<span class="c-kw">void</span>) {`,
    `    <span class="c-kw">int</span> sock = <span class="c-fn">socket</span>(AF_INET, SOCK_STREAM, <span class="c-num">0</span>);`,
    `    <span class="c-kw">if</span> (sock &lt; <span class="c-num">0</span>) <span class="c-kw">return</span> -<span class="c-num">1</span>;`,
    ``,
    `    <span class="c-kw">struct</span> sockaddr_in addr = {<span class="c-num">0</span>};`,
    `    addr.sin_family = AF_INET;`,
    `    addr.sin_port = <span class="c-fn">htons</span>(<span class="c-num">7777</span>);`,
    ``,
    `    <span class="c-kw">return</span> <span class="c-fn">connect</span>(sock, (<span class="c-kw">void</span>*)&amp;addr, <span class="c-kw">sizeof</span>(addr));`,
    `}`,
    ``,
    `<span class="c-kw">int</span> <span class="c-fn">main</span>(<span class="c-kw">int</span> argc, <span class="c-kw">char</span>** argv) {`,
    `    <span class="c-fn">printf</span>(<span class="c-str">"present day. present time.\\n"</span>);`,
    ``,
    `    <span class="c-kw">if</span> (<span class="c-fn">navi_init</span>() &lt; <span class="c-num">0</span>) {`,
    `        <span class="c-fn">fprintf</span>(stderr, <span class="c-str">"layer 07: denied\\n"</span>);`,
    `        <span class="c-kw">return</span> EXIT_FAILURE;`,
    `    }`,
    ``,
    `    <span class="c-cmt">/* close the world, open the next */</span>`,
    `    <span class="c-kw">while</span> (<span class="c-num">1</span>) {`,
    `        <span class="c-fn">poll_wired</span>();`,
    `    }`,
    `}`,
  ];

  return `<div class="ide-tab-bar">
  <span class="ide-tab active">navi.c</span>
  <span class="ide-tab">wired.h</span>
  <span class="ide-tab">Makefile</span>
</div>
<div class="ide-source">${lines.join('\n')}</div>
<div class="ide-status">
  <span>▶ NORMAL · navi.c · C</span>
  <span>UTF-8 · LF · ${lines.length}L</span>
</div>`;
}

export function buildSearch(): string {
  return `<div style="color:#c04070; font-size:12px; margin-bottom:10px;">▶ NAVI search</div>
<div style="background:rgba(35,8,18,0.6); border:1px solid rgba(170,40,80,0.4); padding:8px 12px; color:#c89098; font-size:13px;">
<span style="color:#c04070;">⌕</span> wired<span class="cursor-blink"></span>
</div>
<div style="color:#884058; font-size:10px; margin-top:10px;">results: 47,234 nodes</div>`;
}

export function buildQuotePanel(): string {
  const quote = WIRED_QUOTES[Math.floor(Math.random() * WIRED_QUOTES.length)];
  return `<div style="color:#c04070; font-size:12px; margin-bottom:10px;">▶ WIRED broadcast</div>
<div class="quote">${quote}</div>`;
}

export function buildCoplandLogin(): string {
  return `<pre class="copland-art">${COPLAND_ASCII}</pre>
<div class="copland-label-main">Copland OS Enterprise</div>
<div class="copland-label-sub">Produced By Tachibana Lab</div>
<hr class="login-divider" />
<div class="boot-sequence" data-boot-seq></div>`;
}

// --- background canvas renderer ---
export function drawNoiseFrame(
  ctx: CanvasRenderingContext2D,
  field: NoiseField,
  t: number
): void {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = '#08040a';
  ctx.fillRect(0, 0, w, h);
  const spacing = 5;
  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      const n1 = field.noise3D(x * 0.011, y * 0.011, t * 0.007);
      const n2 = field.noise3D(x * 0.024 + 100, y * 0.024 + 100, t * 0.011);
      const v = n1 * 0.65 + n2 * 0.35;
      if (v > 0.42) {
        const intensity = (v - 0.42) / 0.58;
        const alpha = Math.min(1, intensity * 1.7) * 0.72;
        const radius = 1 + intensity * 1.3;
        ctx.fillStyle = `rgba(150, 30, 65, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
