export default function Login() {
  const submit = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetch("https://restaurant-3-q6kf.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status !== 200) {
      alert("Invalid credentials");
    } else {
      localStorage.setItem("user", JSON.stringify(result));
      window.location.href = "/profile";
    }
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
