import { menuItems } from "../data/menuData"
import { Link } from "react-router-dom"

export default function Navbar({ cart, search, setSearch }) {

  const imagePath = (img) =>
    new URL(`../assets/images/${img}`, import.meta.url).href

  const suggestions =
    search.length > 0
      ? menuItems.filter(item =>
          item[1].toLowerCase().includes(search.toLowerCase())
        )
      : []

  return (
    <header>
      <nav className="nav">
        <div className="logo"><h2>Ruchi Mandal</h2></div>

        <div className="bookmarks">
          <Link to="/#home">Home</Link>
          <Link to="/#menu">Menu</Link>
          <Link to="/#location">Location</Link>
          <Link to="/#booktable">Book Table</Link>
        </div>

        <div className="right-section">

          {/* Search */}
          <div style={{ position: "relative" }}>
            <input
              className="search-box"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {suggestions.length > 0 && (
              <div className="search-dropdown">
                {suggestions.slice(0, 6).map(([img, title, , price], i) => (
                  <Link
                    key={i}
                    to="/#menu"
                    className="search-item"
                    onClick={() => setSearch("")}
                  >
                    <img src={imagePath(img)} alt={title} />
                    <div>
                      <strong>{title}</strong>
                      <p>₹{price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/login" className="account-link">Login</Link>
          <Link to="/register" className="account-link">Register</Link>

          {/* Cart */}
          <Link to="/cart" className="cart-btn">
            <i className="bi bi-cart icon"></i>
            <span className="cart-count">{cart.length}</span>
          </Link>

        </div>
      </nav>
    </header>
  )
}
