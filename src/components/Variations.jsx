import { useState } from 'react'
import { PlusIcon, CrossIcon, RefreshIcon } from './Icons.jsx'

export default function Variations({ data }) {
  const [selected, setSelected] = useState(data.selected)
  return (
    <section className="panel variations">
      <h3>Variations</h3>
      <div className="mini-toolbar">
        <button className="icon-btn"><PlusIcon /></button>
        <button className="icon-btn"><CrossIcon /></button>
        <button className="icon-btn"><RefreshIcon /></button>
      </div>
      <div className="variations-box">
        {data.items.map((item) => (
          <div
            key={item}
            className={'variation-row' + (item === selected ? ' selected' : '')}
            onClick={() => setSelected(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <p className="hint">
        A layer variation saves all the layers with the current states. It helps
        switching between possible layer variations in one step.
      </p>
    </section>
  )
}
