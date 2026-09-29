import { PlusIcon, CrossIcon, MinusIcon } from './Icons.jsx'

function Node({ node }) {
  const hasToggle = node.children || node.collapsed
  return (
    <li>
      <div className="tree-item">
        {hasToggle && <span className="toggle">{node.collapsed ? '+' : '−'}</span>}
        <span>{node.label}</span>
      </div>
      {node.children && (
        <ul>{node.children.map((c) => <Node key={c.label} node={c} />)}</ul>
      )}
    </li>
  )
}

export default function LayerFilters({
  tree, showVisibleOnly, onToggleShowVisibleOnly, showUsedOnly, onToggleShowUsedOnly,
}) {
  return (
    <section className="panel">
      <h3>Layer filters</h3>
      <div className="mini-toolbar">
        <button className="icon-btn"><PlusIcon /></button>
        <button className="icon-btn disabled" disabled><CrossIcon color="#e8a9a6" /></button>
        <button className="icon-btn disabled" disabled><MinusIcon color="#e8a9a6" /></button>
      </div>
      <div className="tree-box">
        <ul className="tree">{tree.map((n) => <Node key={n.label} node={n} />)}</ul>
      </div>
      <label className="check">
        <input type="checkbox" checked={showVisibleOnly} onChange={onToggleShowVisibleOnly} /> Show visible layers only
      </label>
      <label className="check">
        <input type="checkbox" checked={showUsedOnly} onChange={onToggleShowUsedOnly} /> Show used layers only
      </label>
    </section>
  )
}
