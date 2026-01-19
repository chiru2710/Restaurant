export default function BookTable() {
  return (
    <section className="form-section" id="booktable">
      <h2>Book Table</h2>
      <form>
        <input className="input" placeholder="Your Name" required />
        <input className="input" type="number" placeholder="How many people?" required />
        <input className="input" type="datetime-local" required />
        <input className="input" placeholder="Message or special requests" required />
        <button className="submit-btn">Book Table</button>
      </form>
    </section>
  )
}
