import { useState } from "react";
import axios from "axios";
import "../styles/DyslexiaFriendly.css"; // Import the dyslexia-friendly styles

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", {
        username,
        email,
        password,
      });
      setMessage("✅ Registration successful! Please verify your email.");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageClass = () => {
    if (message.includes("✅")) return "message message-success";
    if (message.includes("❌")) return "message message-error";
    return "message";
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 1rem" }}>
      <div className="form-container">
        <h1 style={{ textAlign: "center", marginTop: 0 }}>
          Create Your ReadIQ Account
        </h1>
        
        <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Join ReadIQ to get personalized reading assistance designed for dyslexic learners.
        </p>

        {message && (
          <div className={getMessageClass()} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
              <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>
                {" "}(Choose a name you'll remember easily)
              </span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
              <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>
                {" "}(We'll send you a confirmation email)
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
              <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>
                {" "}(Make it secure but memorable)
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%" }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border-light)" }}>
          <p style={{ color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <a href="/login" style={{ fontWeight: "600" }}>
              Sign in here
            </a>
          </p>
        </div>

        {/* Accessibility and dyslexia-friendly notice */}
        <div style={{ 
          marginTop: "2rem", 
          padding: "1rem", 
          backgroundColor: "var(--secondary-bg)", 
          borderRadius: "6px",
          fontSize: "0.9rem",
          color: "var(--text-secondary)"
        }}>
          <p style={{ margin: 0, textAlign: "center" }}>
            <strong>ReadIQ is designed with dyslexic learners in mind.</strong>
            <br />
            This interface uses dyslexia-friendly fonts, colors, and spacing for better readability.
          </p>
        </div>
      </div>
    </div>
  );
}