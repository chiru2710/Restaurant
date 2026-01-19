import { useState } from "react";

export default function Cart({ cart, setCart }) {
  const [payment, setPayment] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first!");
      return;
    }

    const orderData = {
      user_id: user.id,
      items: cart,
      total_price: total,
      payment_mode: payment,
    };

    await fetch("https://restaurant-3-q6kf.onrender.com/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setCart([]);
      window.location.href = "/profile";
    }, 2500);
  };

  return (
    <div className="form-section">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>

          <div>
            <label>
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery
            </label>

            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                checked={payment === "online"}
                onChange={() => setPayment("online")}
              />
              Online Payment
            </label>
          </div>

          <button className="submit-btn" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}

      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#28a745",
            color: "white",
            padding: "18px 26px",
            borderRadius: "12px",
          }}
        >
          ✅ Order placed successfully!
        </div>
      )}
    </div>
  );
}
