// Panel configuration types and data.

export type PanelType =
  | 'ide'
  | 'search'
  | 'sysinfo'
  | 'charmatrix'
  | 'copland_login'
  | 'quote_panel'
  | 'ascii_organic';

export interface PanelConfig {
  type: PanelType;
  title: string;
  // Positioning (CSS values as strings, e.g. '4%', '440px')
  top?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  transform?: string;
  // charmatrix / ascii_organic grid dimensions
  cols?: number;
  rows?: number;
  // Ephemeral panels despawn after `duration` ms; persistent ones stay forever.
  duration?: number;
  persistent?: boolean;
}

export const PANEL_CONFIGS: PanelConfig[] = [
  {
    top: '4%',
    left: '2%',
    width: '440px',
    height: '600px',
    type: 'ide',
    title: 'vim · ~/wired/navi.c',
    persistent: true,
  },
  {
    top: '5%',
    left: '36%',
    width: '260px',
    height: '120px',
    type: 'search',
    title: 'navi://query',
    duration: 8000,
  },
  {
    top: '50%',
    right: '2%',
    width: '350px',
    height: '380px',
    type: 'sysinfo',
    title: 'sys://protocol',
    duration: 10000,
  },
  {
    // Centered persistent login — stays forever.
    top: '50%',
    left: '50%',
    width: '560px',
    height: '620px',
    transform: 'translate(-50%, -50%)',
    type: 'copland_login',
    title: 'navi://login',
    persistent: true,
  },
  {
    top: '4%',
    right: '2%',
    width: '380px',
    height: '380px',
    type: 'charmatrix',
    cols: 28,
    rows: 30,
    title: 'data://matrix',
    persistent: true,
  },
  {
    top: '70%',
    left: '2%',
    width: '280px',
    height: '110px',
    type: 'quote_panel',
    title: 'wired://broadcast',
    duration: 5500,
  },
];

// Boot sequence shown in the centered login panel.
export type BootLine =
  | { type: 'prompt'; text: string; delay: number }
  | { type: 'kv'; key: string; value: string; delay: number }
  | { type: 'status'; text: string; delay: number };

export const BOOT_LINES: BootLine[] = [
  { type: 'prompt', text: '> Identifying user...', delay: 200 },
  { type: 'kv', key: 'Identity', value: 'Patrick', delay: 120 },
  { type: 'kv', key: 'Role', value: 'Software Engineer', delay: 120 },
  { type: 'kv', key: 'Password', value: '**********', delay: 100 },
  { type: 'status', text: 'ONLINE', delay: 100 },
];

export const WIRED_QUOTES: string[] = [
  "No matter where you are, everyone's connected.",
  'Present day. Present time.',
  'Close the world, open the next.',
  'Lain was never a person now, was she?',
];

// Panel-manager bounds (login / persistent panels do not count toward these).
export const MIN_PANELS = 1;
export const MAX_PANELS = 2;
