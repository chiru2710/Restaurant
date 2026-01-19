import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      fetch(`http://127.0.0.1:8000/orders/${parsed.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch(() => console.log("Orders fetch failed"));
    }
  }, []);

  if (!user) {
    return <h2>Please login</h2>;
  }

  return (
    <div className="form-section">
      <h2>My Profile</h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>

      <h3>Orders History</h3>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
        >
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>
          <p>
            <strong>Payment:</strong> {order.payment}
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
        </div>
      ))}
    </div>
  );
}
