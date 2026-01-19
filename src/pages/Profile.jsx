import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      fetch(`https://restaurant-3-q6kf.onrender.com/orders/${parsed.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.log(err));
    }
  }, []);

  if (!user) return <h2>Please login</h2>;

  return (
    <div className="form-section">
      <h2>My Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address}</p>

      <h3>Orders History</h3>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((o) => (
        <div key={o.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <p><strong>Order ID:</strong> {o.id}</p>
          <p><strong>Total:</strong> ₹{o.total}</p>
          <p><strong>Date:</strong> {o.date}</p>
        </div>
      ))}
    </div>
  );
}
