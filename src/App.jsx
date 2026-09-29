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
        <span>Layer Properties Management</span>
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
          <LayerTable layers={layers} visibleIndices={visibleIndices} selected={selected}
            onRowClick={handleRowClick} onActivate={handleActivate}
            onToggle={handleToggle} onRename={handleRename}
            onLineWidthChange={handleLineWidthChange} />
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
