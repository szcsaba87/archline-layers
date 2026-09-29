import {
  NewLayerIcon, DeleteLayerIcon, ApplyLayerIcon, SearchClipboardIcon,
  SwitchOnAllIcon, SwitchOffAllIcon, LockAllIcon, UnlockAllIcon, MergeIcon,
  PrintableAllIcon, InvertSelectionIcon, SelectAllIcon, DeselectAllIcon,
} from './Icons.jsx'

// [tooltip, icon, action key, needs a selection]
const groups = [
  [
    ['Set as active layer', ApplyLayerIcon, 'setCurrent'],
    ['New layer', NewLayerIcon, 'newLayer'],
    ['Delete selected', DeleteLayerIcon, 'deleteSelected'],
    ['Merge selected into...', MergeIcon, 'merge'],
  ],
  [
    ['Select all', SelectAllIcon, 'selectAll'],
    ['Deselect all', DeselectAllIcon, 'deselectAll'],
    ['Invert selection', InvertSelectionIcon, 'invert'],
  ],
  [
    ['Switch on selected', SwitchOnAllIcon, 'switchOn', true],
    ['Switch off selected', SwitchOffAllIcon, 'switchOff', true],
    ['Lock selected', LockAllIcon, 'lock', true],
    ['Unlock selected', UnlockAllIcon, 'unlock', true],
    ['Make selected printable', PrintableAllIcon, 'printable', true],
  ],
]

export default function Toolbar({
  onInvertSelection, onSelectAll, onDeselectAll, onSetCurrent, canSetCurrent,
  onBulkChange, hasSelection,
}) {
  const actions = {
    invert: onInvertSelection, selectAll: onSelectAll,
    deselectAll: onDeselectAll, setCurrent: onSetCurrent,
    switchOn: () => onBulkChange('on', true),
    switchOff: () => onBulkChange('on', false),
    lock: () => onBulkChange('locked', true),
    unlock: () => onBulkChange('locked', false),
    printable: () => onBulkChange('printable', true),
  }
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        {groups.map((group, g) => (
          <div key={g} className="toolbar-group">
            {group.map(([title, Icon, action, needsSelection]) => (
              <button key={action} className="icon-btn" title={title}
                onClick={actions[action]}
                disabled={(action === 'setCurrent' && !canSetCurrent) || (needsSelection && !hasSelection)}>
                <Icon />
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="search">
        <button className="icon-btn" title="Export to clipboard"><SearchClipboardIcon /></button>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  )
}
