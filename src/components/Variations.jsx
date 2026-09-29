import { PlusIcon, CrossIcon, RefreshIcon } from './Icons.jsx'

export default function Variations({ data }) {
  return (
    <section className="panel variations">
      <h3>Variations</h3>
      <div className="mini-toolbar">
        <button className="icon-btn"><PlusIcon /></button>
        <button className="icon-btn"><CrossIcon /></button>
        <button className="icon-btn"><RefreshIcon /></button>
      </div>
      <div className="tree-box tall">
        <ul className="tree">
          <li>
            <div className="tree-item"><span className="toggle">−</span><span>{data.root}</span></div>
            <ul>
              {data.items.map((item) => (
                <li key={item}>
                  <div className={'tree-item' + (item === data.selected ? ' selected' : '')}>
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <p className="hint">
        A layer variation saves all the layers with the current states. It helps
        switching between possible layer variations in one step.
      </p>
    </section>
  )
}
