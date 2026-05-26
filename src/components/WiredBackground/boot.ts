// Typewriter boot sequence for the centered login panel.
// Returns a cleanup function that cancels any pending timers.

import { BOOT_LINES, type BootLine } from './panels';

export function runBootSequence(target: HTMLElement): () => void {
  const lines = BOOT_LINES;
  let lineIdx = 0;
  let charIdx = 0;
  let currentEl: HTMLElement | null = null;
  let currentP: HTMLDivElement & { _target?: string };
  const timers: number[] = [];

  function startLine(): HTMLDivElement & { _target?: string } {
    const line: BootLine = lines[lineIdx];
    const p = document.createElement('div') as HTMLDivElement & { _target?: string };
    p.className = 'boot-line';

    if (line.type === 'prompt') {
      p.innerHTML = `<span class="boot-prompt"></span><span class="boot-cursor"></span>`;
      currentEl = p.querySelector('.boot-prompt');
      p._target = line.text;
    } else if (line.type === 'kv') {
      const paddedKey = line.key.padEnd(10, ' ');
      p.innerHTML = `<span class="boot-prompt">&gt; </span><span class="boot-key">${paddedKey}</span><span class="boot-prompt">: </span><span class="boot-value"></span><span class="boot-cursor"></span>`;
      currentEl = p.querySelector('.boot-value');
      p._target = line.value;
    } else {
      p.innerHTML = `<span class="boot-prompt">&gt; Status    : </span><span class="boot-status-online"></span><span class="boot-cursor"></span>`;
      currentEl = p.querySelector('.boot-status-online');
      p._target = line.text;
    }

    target.appendChild(p);
    return p;
  }

  function tick(): void {
    const line = lines[lineIdx];
    const text = currentP._target ?? '';

    if (charIdx < text.length) {
      if (currentEl) currentEl.textContent += text[charIdx];
      charIdx++;
      timers.push(window.setTimeout(tick, 8 + Math.random() * 10));
    } else {
      const cursor = currentP.querySelector('.boot-cursor');
      lineIdx++;
      if (lineIdx < lines.length) {
        if (cursor) cursor.classList.remove('boot-cursor');
        charIdx = 0;
        timers.push(
          window.setTimeout(() => {
            currentP = startLine();
            tick();
          }, line.delay)
        );
      }
      // Final line keeps its blinking cursor.
    }
  }

  currentP = startLine();
  tick();

  return () => {
    timers.forEach((id) => window.clearTimeout(id));
  };
}
