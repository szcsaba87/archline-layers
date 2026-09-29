export default function Notes({ notes }) {
  return (
    <section className="notes">
      <h2>{notes.title}</h2>
      <h4>{notes.heading}</h4>
      <ul>
        {notes.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <h4>{notes.notCovered.heading}</h4>
      <ul>
        {notes.notCovered.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}
