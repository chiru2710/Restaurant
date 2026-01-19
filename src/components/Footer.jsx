export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* CONTACT */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <a href="#location"><p>📍 Location</p></a>
          <p>📞 Call +91 9999988888</p>
          <a href="mailto:jangilichiranjeevi2@gmail.com">
            <p>📧 jangilichiranjeevi2@gmail.com</p>
          </a>
        </div>

        {/* ABOUT */}
        <div className="footer-column">
          <h3>Ruchi Mandal</h3>
          <p>
            Bringing you the authentic taste of tradition, one delicious bite at a time.
          </p>

          <div className="social-icons">
            <a href="https://github.com/chiru2710"><i className="bi bi-github"></i></a>
            <a href="https://www.linkedin.com/in/chiranjeevi-jangili-213097315"><i className="bi bi-linkedin"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-whatsapp"></i></a>
            <a href="#"><i className="bi bi-browser-chrome"></i></a>
          </div>
        </div>

        {/* HOURS */}
        <div className="footer-column">
          <h3>Opening Hours</h3>
          <p>Everyday</p>
          <p>10.00 Am - 10.00 Pm</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 All Rights Reserved By CHIRANJEEVI</p>
      </div>
    </footer>
  )
}
