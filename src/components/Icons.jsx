const Stack = () => (
  <>
    <polygon points="22,4 38,13 22,22 6,13" fill="#b9b9b9" stroke="#6b6b6b" strokeWidth="1.4" strokeLinejoin="round" />
    <polygon points="6,17 22,26 38,17 38,21 22,30 6,26" fill="#9c9c9c" stroke="#6b6b6b" strokeWidth="1.4" strokeLinejoin="round" />
  </>
)
export const NewLayerIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <Stack />
    <path d="M35 29v11M29.5 34.5h11" stroke="#2ea44f" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
)
export const DeleteLayerIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <Stack />
    <path d="M30 29l10 10M40 29l-10 10" stroke="#d6413a" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
)
export const ApplyLayerIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <Stack />
    <path d="M28.5 35l3.5 3.5 8.5-9.5" fill="none" stroke="#2ea44f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const LayerIcon = ({ size = 16, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <polygon points="22,12 34,18.5 22,25 10,18.5"
      fill={filled ? '#6d8bb3' : 'none'}
      stroke={filled ? '#33517a' : '#6d8bb3'}
      strokeWidth={filled ? 1.6 : 2.2}
      strokeLinejoin="round" />
  </svg>
)
export const LinkIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#555" strokeWidth="1.6">
    <path d="M6.5 9.5l3-3" />
    <path d="M7 4.5l1-1a3 3 0 014.2 4.2l-1 1" />
    <path d="M9 11.5l-1 1a3 3 0 01-4.2-4.2l1-1" />
  </svg>
)
export const BulbIcon = ({ on = true, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <path d="M8 1.5a4.5 4.5 0 00-2.5 8.2V11h5V9.7A4.5 4.5 0 008 1.5z"
      fill={on ? '#ffe066' : '#ddd'} stroke={on ? '#b8860b' : '#888'} />
    <path d="M6 12.5h4M6.5 14h3" stroke="#666" />
  </svg>
)
export const LockIcon = ({ locked = false, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <path d={locked ? 'M5 7V5a3 3 0 016 0v2' : 'M5 7.5V5a3 3 0 015.7-1.3'}
      fill="none" stroke={locked ? '#777' : '#aaa'} strokeWidth="1.4" />
    <rect x="3" y="7" width="10" height="7" rx="1"
      fill={locked ? '#f2c94c' : '#e4e4e4'} stroke={locked ? '#a67c00' : '#999'} />
    {locked
      ? <circle cx="8" cy="10" r="1" fill="#7a5200" />
      : <path d="M8 9v2" stroke="#999" strokeWidth="1.2" />}
  </svg>
)
export const PrinterIcon = ({ on = true, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <rect x="4" y="1.5" width="8" height="4" fill="#fff" stroke={on ? '#555' : '#aaa'} />
    <rect x="1.5" y="5.5" width="13" height="6" rx="1" fill={on ? '#777' : '#ddd'} stroke={on ? '#333' : '#aaa'} />
    <rect x="4" y="9.5" width="8" height="5" fill="#fff" stroke={on ? '#555' : '#aaa'} />
    {!on && <path d="M2 2l12 12" stroke="#d63a32" strokeWidth="1.6" />}
  </svg>
)

export const SearchClipboardIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="3" y="4" width="10" height="13" rx="1" stroke="#2f7fd0" strokeWidth="1.4" fill="#e8f2ff" />
    <rect x="6" y="2" width="4" height="3" fill="#2f7fd0" />
    <rect x="9" y="7" width="8" height="10" rx="1" stroke="#2f7fd0" strokeWidth="1.4" fill="#fff" />
  </svg>
)
export const PlusIcon = ({ color = '#2f7fd0', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22">
    <path d="M11 3v16M3 11h16" stroke={color} strokeWidth="4" />
  </svg>
)
export const CrossIcon = ({ color = '#e0413a', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22">
    <path d="M4 4l14 14M18 4L4 18" stroke={color} strokeWidth="4" />
  </svg>
)
export const MinusIcon = ({ color = '#e0413a', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22">
    <path d="M3 11h16" stroke={color} strokeWidth="4" />
  </svg>
)
export const RefreshIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" stroke="#2f7fd0" strokeWidth="2.6">
    <path d="M18 11a7 7 0 11-2.2-5.1" />
    <path d="M17 1.5v5h-5" strokeWidth="2.2" />
  </svg>
)

export const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <path d="M2 8.5l4 4 8-10" fill="none" stroke="#1fa34a" strokeWidth="3" />
  </svg>
)
const Bulb = ({ x = 0, y = 0, on, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M8 1.5a4.5 4.5 0 00-2.5 8.2V11h5V9.7A4.5 4.5 0 008 1.5z"
      fill={on ? '#ffe066' : '#e4e4e4'} stroke={on ? '#b8860b' : '#888'} />
    <path d="M6 12.5h4" stroke="#666" />
  </g>
)
const Padlock = ({ x = 0, y = 0, locked, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={locked ? 'M5 7V5a3 3 0 016 0v2' : 'M5 7V5a3 3 0 015.6-1.5'}
      fill="none" stroke="#777" strokeWidth="1.4" />
    <rect x="3" y="7" width="10" height="7" rx="1" fill="#f2c94c" stroke="#a67c00" />
  </g>
)
export const SwitchOnAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <Bulb x={-2} y={-1} on s={1.5} />
    <path d="M17 3v5M15 5.5h4" stroke="#1fa34a" strokeWidth="2" />
  </svg>
)
export const SwitchOffAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <Bulb x={-2} y={-1} on={false} s={1.5} />
    <path d="M15 3l5 5M20 3l-5 5" stroke="#e0413a" strokeWidth="2" />
  </svg>
)
export const LockAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <Padlock x={-1} y={2} locked s={1.5} />
    <path d="M17 3v5M15 5.5h4" stroke="#1fa34a" strokeWidth="2" />
  </svg>
)
export const UnlockAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <Padlock x={-1} y={2} locked={false} s={1.5} />
    <path d="M15 3l5 5M20 3l-5 5" stroke="#e0413a" strokeWidth="2" />
  </svg>
)
export const MergeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <Stack />
    <path d="M40 40L30.5 30.5" stroke="#3378c9" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    <path d="M30.5 30.5l6.5 1.3M30.5 30.5l1.3 6.5" stroke="#3378c9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)
export const PrintableAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <g transform="translate(-1 2) scale(1.4)">
      <rect x="4" y="1.5" width="8" height="4" fill="#fff" stroke="#555" />
      <rect x="1.5" y="5.5" width="13" height="6" rx="1" fill="#777" stroke="#333" />
      <rect x="4" y="9.5" width="8" height="5" fill="#fff" stroke="#555" />
    </g>
    <path d="M18 2v5M15.5 4.5h5" stroke="#1fa34a" strokeWidth="2" />
  </svg>
)
export const InvertSelectionIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="3.5" width="19" height="4" fill="#5b8fd6" stroke="#2f5fa8" />
    <rect x="2.5" y="10" width="19" height="4" fill="#fff" stroke="#2f5fa8" />
    <rect x="2.5" y="16.5" width="19" height="4" fill="#5b8fd6" stroke="#2f5fa8" />
    <path d="M18 8.5l-3 3 3 3M6 8.5l3 3-3 3" stroke="#d6541f" strokeWidth="0" />
    <path d="M12 8.2v7.6M9.6 13.4L12 15.8l2.4-2.4" stroke="#d6541f" strokeWidth="1.6" />
  </svg>
)

export const SelectAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="3.5" width="19" height="4" fill="#5b8fd6" stroke="#2f5fa8" />
    <rect x="2.5" y="10" width="19" height="4" fill="#5b8fd6" stroke="#2f5fa8" />
    <rect x="2.5" y="16.5" width="19" height="4" fill="#5b8fd6" stroke="#2f5fa8" />
  </svg>
)
export const DeselectAllIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2.5" y="3.5" width="19" height="4" fill="#fff" stroke="#2f5fa8" />
    <rect x="2.5" y="10" width="19" height="4" fill="#fff" stroke="#2f5fa8" />
    <rect x="2.5" y="16.5" width="19" height="4" fill="#fff" stroke="#2f5fa8" />
  </svg>
)
