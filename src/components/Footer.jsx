import { Settings } from 'lucide-react'

export default function Footer() {
  return (
    <div className="footer-options">
      <label className="check"><input type="checkbox" defaultChecked /> Do not delete used layers</label>
      <label className="check"><input type="checkbox" /> Layer control mode</label>
      <span className="check-group gear-group">
        <label className="check"><input type="checkbox" /> Protocol for Layer Naming</label>
        <button className="icon-btn framed" title="Layer naming settings"><Settings size={18} strokeWidth={1.75} color="#555" /></button>
      </span>
    </div>
  )
}
