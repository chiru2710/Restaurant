import { useState } from "react"

export default function Offers({ addToCart }) {

  const [showMessage, setShowMessage] = useState(false)
  const [lastAdded, setLastAdded] = useState("")

  const imagePath = (img) =>
    new URL(`../assets/images/${img}`, import.meta.url).href

  const handleAddToCart = (item) => {
    addToCart(item)
    setLastAdded(item.title)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 2000)
  }

  return (
    <section className="offers-container section-spacing">

      <div className="offer-card">
        <div className="image-circle">
          <img src={imagePath("1.jpeg")} alt="Tasty Thursdays" />
        </div>
        <div className="content">
          <h3>Tasty Thursdays</h3>
          <p className="discount">20% <span>off</span></p>
          <button
            className="order-btn"
            onClick={() =>
              handleAddToCart({
                title: "Paneer Tikka",
                price: 220,
                image: imagePath("1.jpeg")
              })
            }
          >
            Order Now <i className="bi bi-cart-fill"></i>
          </button>
        </div>
      </div>

      <div className="offer-card">
        <div className="image-circle">
          <img src={imagePath("2.jpg")} alt="Biryani Blast" />
        </div>
        <div className="content">
          <h3>Biryani Blast</h3>
          <p className="discount">15% <span>off</span></p>
          <button
            className="order-btn"
            onClick={() =>
              handleAddToCart({
                title: "Chicken Biryani",
                price: 250,
                image: imagePath("2.jpg")
              })
            }
          >
            Order Now <i className="bi bi-cart-fill"></i>
          </button>
        </div>
      </div>

      {/* CENTER ANIMATED "ADDED TO CART" MESSAGE */}
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#ffc107",
            color: "black",
            padding: "16px 22px",
            borderRadius: "12px",
            boxShadow: "0 0 12px rgba(0,0,0,0.25)",
            textAlign: "center",
            zIndex: 9999,
            animation: "fadeZoom 0.4s ease-out"
          }}
        >
          ✅ <strong>{lastAdded}</strong> added to cart!
        </div>
      )}

      <style>
        {`
          @keyframes fadeZoom {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>

    </section>
  )
}
