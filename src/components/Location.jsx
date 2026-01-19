export default function Location() {
  return (
    <section className="location" id="location">
      <div className="location-container">
        <h2>Location</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15892.939088289723!2d80.3992645!3d15.8620198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1718799000000"
          width="100%"
          height="315"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>
    </section>
  )
}
