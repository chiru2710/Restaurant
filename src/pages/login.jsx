import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const result = await res.json();

    // ✅ Store full user object in localStorage
    localStorage.setItem("user", JSON.stringify(result));

    navigate("/profile");
  };

  return (
    <div className="form-section">
      <h2>Sign In</h2>
      <form onSubmit={submit}>
        <input name="email" className="input" placeholder="Email" required />
        <input
          name="password"
          className="input"
          type="password"
          placeholder="Password"
          required
        />
        <button className="submit-btn">Login</button>
      </form>
    </div>
  );
}
