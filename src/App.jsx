import { useRef, useState } from 'react'
import Toolbar from './components/Toolbar.jsx'
import LayerTable from './components/LayerTable.jsx'
import LayerFilters from './components/LayerFilters.jsx'
import Variations from './components/Variations.jsx'
import Footer from './components/Footer.jsx'
import Notes from './components/Notes.jsx'
import { layers as initialLayers, filterTree, variations } from './data/layers.js'
import { notes } from './data/notes.js'

export default function App() {
  const [layers, setLayers] = useState(initialLayers)
  const [selected, setSelected] = useState(new Set())
  const [showUsedOnly, setShowUsedOnly] = useState(false)
  const [showVisibleOnly, setShowVisibleOnly] = useState(false)
  // Sorting is a one-time action, frozen into an explicit row order — not
  // something recomputed live from the data. That's what keeps toggling a
  // bulb/lock/printer icon from silently reshuffling the table: rowOrder
  // only ever changes when a header is clicked.
  const [rowOrder, setRowOrder] = useState(() => initialLayers.map((_, i) => i))
  // Name's own A-Z/Z-A state: toggled only by the Name header, and reused
  // as the tie-break direction whenever On/Lock/Print is the active sort.
  const [nameDirection, setNameDirection] = useState('asc')
  // Each state column remembers its own asc/desc independently.
  const [columnDirections, setColumnDirections] = useState({ on: 'asc', lock: 'asc', print: 'asc' })
  const anchor = useRef(null)

  const handleRowClick = (index, e) => {
    if (e.shiftKey && anchor.current !== null) {
      const [a, b] = [anchor.current, index].sort((x, y) => x - y)
      const range = new Set()
      for (let i = a; i <= b; i++) range.add(i)
      setSelected(e.ctrlKey || e.metaKey ? new Set([...selected, ...range]) : range)
    } else if (e.ctrlKey || e.metaKey) {
      const next = new Set(selected)
      next.has(index) ? next.delete(index) : next.add(index)
      setSelected(next)
      anchor.current = index
    } else {
      setSelected(new Set([index]))
      anchor.current = index
    }
  }

  const handleActivate = (index) =>
    setLayers((prev) => prev.map((l, i) => ({ ...l, active: i === index })))

  const handleRename = (index, name) =>
    setLayers((prev) => prev.map((l, i) => (i === index ? { ...l, name } : l)))

  const handleLineWidthChange = (index, lineWidth) =>
    setLayers((prev) => prev.map((l, i) => (i === index ? { ...l, lineWidth } : l)))

  const visibleIndices = layers
    .map((l, i) => i)
    .filter((i) => {
      const layer = layers[i]
      if (layer.active) return true
      if (showUsedOnly && layer.empty) return false
      if (showVisibleOnly && !layer.on) return false
      return true
    })

  // The frozen row order, filtered down to whatever's currently visible.
  // Filtering stays live (so the "Show ... only" checkboxes keep working
  // instantly) — only the relative ORDER is frozen until the next header click.
  const sortedIndices = rowOrder.filter((i) => visibleIndices.includes(i))

  // Header keys ('on' / 'lock' / 'print') don't all match their data field
  // names ('on' / 'locked' / 'printable') — this maps header to field.
  const SORT_FIELD = { on: 'on', lock: 'locked', print: 'printable' }

  // Recomputes a full permutation of every layer index, sorted by `column`
  // (grouped by Source, same as before), using the direction values passed
  // in — not the state values, since this runs before the toggle that
  // produced them has necessarily been committed.
  const computeOrder = (column, colDirection, nameDir) => {
    const nameMult = nameDir === 'asc' ? 1 : -1
    const byName = (a, b) =>
      layers[a].name.localeCompare(layers[b].name, undefined, { numeric: true, sensitivity: 'base' }) * nameMult

    const groups = []
    const groupOf = new Map()
    for (let i = 0; i < layers.length; i++) {
      const key = layers[i].source
      if (!groupOf.has(key)) { groupOf.set(key, []); groups.push(groupOf.get(key)) }
      groupOf.get(key).push(i)
    }
    for (const group of groups) {
      group.sort((a, b) => {
        if (column === 'name') return byName(a, b)
        const colMult = colDirection === 'asc' ? 1 : -1
        const field = SORT_FIELD[column]
        const aVal = layers[a][field] ? 1 : 0
        const bVal = layers[b][field] ? 1 : 0
        const primary = (bVal - aVal) * colMult // asc: on/locked/printable first
        return primary !== 0 ? primary : byName(a, b)
      })
    }
    return groups.flat()
  }

  const handleSortColumn = (column) => {
    if (column === 'name') {
      const nextDirection = nameDirection === 'asc' ? 'desc' : 'asc'
      setNameDirection(nextDirection)
      setRowOrder(computeOrder('name', null, nextDirection))
    } else {
      const nextDirection = columnDirections[column] === 'asc' ? 'desc' : 'asc'
      setColumnDirections((prev) => ({ ...prev, [column]: nextDirection }))
      setRowOrder(computeOrder(column, nextDirection, nameDirection))
    }
  }

  const handleToggle = (index, field) =>
    setLayers((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: !l[field] } : l)))

  const canSetCurrent = selected.size === 1
  const handleSetCurrent = () => {
    if (canSetCurrent) handleActivate([...selected][0])
  }

  const handleBulkChange = (field, value) =>
    setLayers((prev) => prev.map((l, i) => (selected.has(i) ? { ...l, [field]: value } : l)))

  const handleSelectAll = () => setSelected(new Set(layers.map((_, i) => i)))
  const handleDeselectAll = () => setSelected(new Set())

  const handleInvertSelection = () =>
    setSelected(new Set(layers.map((_, i) => i).filter((i) => !selected.has(i))))

  return (
    <div className="page">
    <div className="dialog">
      <div className="titlebar">
        <span>Layer Properties Management v2.0</span>
        <button className="close" aria-label="Close">×</button>
      </div>
      <div className="dialog-body">
        <div className="left">
          <Toolbar
            onInvertSelection={handleInvertSelection}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onSetCurrent={handleSetCurrent}
            canSetCurrent={canSetCurrent}
            onBulkChange={handleBulkChange}
            hasSelection={selected.size > 0}
          />
          <LayerTable layers={layers} visibleIndices={sortedIndices} selected={selected}
            onRowClick={handleRowClick} onActivate={handleActivate}
            onToggle={handleToggle} onRename={handleRename}
            onLineWidthChange={handleLineWidthChange}
            onSortColumn={handleSortColumn} />
          <Footer />
        </div>
        <div className="right">
          <LayerFilters
            tree={filterTree}
            showVisibleOnly={showVisibleOnly}
            onToggleShowVisibleOnly={(e) => setShowVisibleOnly(e.target.checked)}
            showUsedOnly={showUsedOnly}
            onToggleShowUsedOnly={(e) => setShowUsedOnly(e.target.checked)}
          />
          <Variations data={variations} />
          <div className="footer-buttons">
            <button className="btn">OK</button>
            <button className="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <Notes notes={notes} />
    </div>
  )
}
