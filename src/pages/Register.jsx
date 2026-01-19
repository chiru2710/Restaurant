import { useState, useEffect } from "react";

export default function Register() {
  const [address, setAddress] = useState("Fetching location...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-fetch location when page loads
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setAddress("Geolocation not supported by your browser");
      setError("Enable location in your browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          const fullAddress =
            data.display_name || "Address not found, please enter manually";

          setAddress(fullAddress);
        } catch (err) {
          setAddress("Failed to fetch address. Enter manually.");
          setError("Try again or type manually.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setAddress("Location permission denied. Enter manually.");
        setError("Please allow location access.");
        setLoading(false);
      }
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      password: e.target.password.value,
      address: address
    };

    if (!data.address || data.address.includes("Fetching")) {
      alert("Please fetch or enter your address before submitting.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      alert(result.message);
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed. Check backend server.");
    }
  };

  return (
    <div className="form-section">
      <h2>Create Account</h2>

      <form onSubmit={submit}>
        <input
          name="name"
          className="input"
          placeholder="Full Name"
          required
        />

        <input
          name="phone"
          className="input"
          type="tel"
          placeholder="Phone Number"
          pattern="[0-9]{10}"
          required
        />

        <input
          name="email"
          className="input"
          placeholder="Email"
          required
        />

        <input
          name="password"
          className="input"
          type="password"
          placeholder="Password"
          required
        />

        <textarea
          className="input"
          value={loading ? "Fetching your location..." : address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
        />

        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <button
          type="button"
          className="order-btn"
          onClick={getLocation}
        >
          📍 Use My Current Location
        </button>

        <button className="submit-btn">Register</button>
      </form>
    </div>
  );
}
