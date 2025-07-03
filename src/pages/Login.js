import { useState } from "react";
import axios from "axios";
import "../styles/DyslexiaFriendly.css"; // reuse the same styling

export default function Login() {
  const [email, setEmail] = useState(""); // change from username to email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email, // send email
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem("access_token", token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setMessage("❌ Invalid credentials or email not verified.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 1rem" }}>
      <div className="form-container">
        <h1 style={{ textAlign: "center" }}>Login to ReadIQ</h1>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Access your personalized reading support
        </p>

        {message && (
          <div className="message message-error" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "var(--text-secondary)" }}>
            Don’t have an account?{" "}
            <a href="/register" style={{ fontWeight: "600" }}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
