import { useState } from "react";

export default function Cart({ cart, setCart }) {
  const [payment, setPayment] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);

  const increase = (title) => {
    setCart(
      cart.map((i) =>
        i.title === title ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decrease = (title) => {
    setCart(
      cart
        .map((i) =>
          i.title === title ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to place order");
      return;
    }

    const orderData = {
      user_id: user.id,
      items: cart,
      total_price: total,
      payment_mode: payment === "cod" ? "Cash on Delivery" : "Online",
    };

    await fetch("http://127.0.0.1:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setCart([]);
    }, 2500);
  };

  return (
    <div className="form-section">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item.title}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "15px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <strong>{item.title}</strong>
          </div>

          <div>
            <button onClick={() => decrease(item.title)}>-</button>
            <span style={{ margin: "0 10px" }}>{item.qty}</span>
            <button onClick={() => increase(item.title)}>+</button>
          </div>

          <strong>₹{item.price * item.qty}</strong>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>

          <div style={{ margin: "15px 0", textAlign: "left" }}>
            <label>
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />{" "}
              Cash on Delivery
            </label>
            <br />

            <label>
              <input
                type="radio"
                checked={payment === "online"}
                onChange={() => setPayment("online")}
              />{" "}
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
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            textAlign: "center",
            zIndex: 9999,
            animation: "fadeZoom 0.4s ease-out",
          }}
        >
          ✅ Order placed successfully! <br />
          Payment Mode:{" "}
          {payment === "cod" ? "Cash on Delivery" : "Online Payment"}
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
    </div>
  );
}
