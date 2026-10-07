import { useRef, useState } from 'react'
import { BulbIcon, LockIcon, PrinterIcon, LayerIcon, LinkIcon, CheckIcon } from './Icons.jsx'

const columns = [
  ['name', 'Name'], ['on', 'On'], ['lock', 'Lock'],
  ['print', 'Print'], ['color', 'Color'], ['lineType', 'Line-type'],
  ['lineWidth', 'Line-width'], ['source', 'Source'], ['description', 'Description'],
]

// A slow second click on an already-selected, single row's editable text
// starts renaming it, the same way Windows Explorer does. A genuine
// double-click (used elsewhere to activate the layer) cancels the timer
// before it fires, so the two gestures never collide.
const RENAME_DELAY = 400

function Swatch({ color }) {
  return (
    <span
      className="swatch"
      style={color === 'split'
        ? { background: 'linear-gradient(to top right, #000 50%, #fff 50%)' }
        : { background: color }}
    />
  )
}

function NameIcon({ layer }) {
  if (layer.active) return <CheckIcon size={16} />
  if (layer.linked) return <LinkIcon size={16} />
  return <LayerIcon size={22} filled={!layer.empty} />
}

function CellToggle({ title, onToggle, children }) {
  return (
    <button className="cell-btn" title={title}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      onDoubleClick={(e) => e.stopPropagation()}>
      {children}
    </button>
  )
}

// Numbers only while typing, at most one decimal point — "0.5" is fine.
const NUMERIC_RE = /^\d*\.?\d*$/

function EditableText({ value, display, canEdit, onCommit, numeric, onClick: extraOnClick }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const timer = useRef(null)

  const cancelTimer = () => { clearTimeout(timer.current); timer.current = null }

  const handleClick = (e) => {
    extraOnClick?.(e)
    if (!canEdit || e.ctrlKey || e.metaKey || e.shiftKey) return
    cancelTimer()
    timer.current = setTimeout(() => {
      setDraft(String(value))
      setEditing(true)
    }, RENAME_DELAY)
  }

  const commit = () => {
    setEditing(false)
    onCommit(draft)
  }

  const cancel = () => setEditing(false)

  if (editing) {
    return (
      <input
        className="cell-edit"
        autoFocus
        value={draft}
        onChange={(e) => {
          const v = e.target.value
          if (numeric) {
            if (NUMERIC_RE.test(v)) setDraft(v)
          } else {
            setDraft(v)
          }
        }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') cancel()
        }}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      />
    )
  }

  return (
    <span className="ellipsis" onClick={handleClick} onDoubleClick={cancelTimer}>
      {display}
    </span>
  )
}

function Row({ layer, selected, onlySelected, onClick, onActivate, onToggle, onRename, onLineWidthChange }) {
  const cls = [layer.linked && 'linked', selected && 'selected'].filter(Boolean).join(' ')
  return (
    <tr className={cls} onClick={onClick}>
      <td className="c-name" onDoubleClick={onActivate}>
        <span className="cell-icon"><NameIcon layer={layer} /></span>
        <EditableText
          value={layer.name}
          display={layer.name}
          canEdit={onlySelected}
          onCommit={(v) => { const t = v.trim(); if (t) onRename(t) }}
        />
      </td>
      <td className="c-icon">
        <CellToggle title="Switch on/off" onToggle={() => onToggle('on')}><BulbIcon on={layer.on} /></CellToggle>
      </td>
      <td className="c-icon">
        <CellToggle title="Lock/unlock" onToggle={() => onToggle('locked')}><LockIcon locked={layer.locked} /></CellToggle>
      </td>
      <td className="c-icon">
        <CellToggle title="Printable on/off" onToggle={() => onToggle('printable')}><PrinterIcon on={layer.printable} /></CellToggle>
      </td>
      <td><Swatch color={layer.color} /></td>
      <td>{layer.lineType}</td>
      <td>
        <EditableText
          value={layer.lineWidth}
          display={`${layer.lineWidth} mm`}
          canEdit={onlySelected}
          numeric
          onCommit={(v) => {
            const num = parseFloat(v)
            if (!Number.isNaN(num) && num >= 0) onLineWidthChange(num)
          }}
        />
      </td>
      <td onDoubleClick={onActivate}><span className="ellipsis">{layer.source}</span></td>
      <td>{layer.description}</td>
    </tr>
  )
}

const SORTABLE_COLUMNS = new Set(['name', 'on', 'lock', 'print'])

export default function LayerTable({
  layers, visibleIndices, selected, onRowClick, onActivate, onToggle, onRename, onLineWidthChange,
  onSortColumn,
}) {
  const indices = visibleIndices ?? layers.map((_, i) => i)
  return (
    <div className="table-wrap">
      <table className="layer-table">
        <colgroup>
          <col style={{ width: 230 }} />
          <col style={{ width: 44 }} /><col style={{ width: 44 }} />
          <col style={{ width: 44 }} /><col style={{ width: 40 }} />
          <col style={{ width: 76 }} /><col style={{ width: 86 }} />
          <col style={{ width: 112 }} /><col style={{ width: 90 }} />
        </colgroup>
        <thead>
          <tr>
            {columns.map(([key, label]) => (
              SORTABLE_COLUMNS.has(key) ? (
                <th key={key} className="sortable" onClick={() => onSortColumn(key)}>{label}</th>
              ) : (
                <th key={key}>{label}</th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {indices.map((i) => (
            <Row key={i} layer={layers[i]} selected={selected.has(i)}
              onlySelected={selected.has(i) && selected.size === 1}
              onClick={(e) => onRowClick(i, e)} onActivate={() => onActivate(i)}
              onToggle={(field) => onToggle(i, field)}
              onRename={(name) => onRename(i, name)}
              onLineWidthChange={(value) => onLineWidthChange(i, value)} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
