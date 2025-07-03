import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DyslexiaFriendly.css";

export default function ProfileEdit() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch current user
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/protected/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    const token = localStorage.getItem("access_token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/protected/update-profile",
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 1rem" }}>
      <div className="form-container">
        <h1 style={{ textAlign: "center", marginTop: 0 }}>
          Edit Your Profile
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
          }}
        >
          Keep your profile information up to date for personalized
          recommendations.
        </p>

        {message && (
          <div
            className={
              message.includes("✅")
                ? "message message-success"
                : "message message-error"
            }
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username
              <span
                style={{
                  color: "var(--text-muted)",
                  fontWeight: "normal",
                  marginLeft: "0.25rem",
                }}
              >
                (what people see)
              </span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
              <span
                style={{
                  color: "var(--text-muted)",
                  fontWeight: "normal",
                  marginLeft: "0.25rem",
                }}
              >
                (we’ll confirm changes by email)
              </span>
            </label>
            <input
                type="email"
                id="email"
                value={email}
                disabled
                />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border-light)",
          }}
        >
          <a href="/dashboard" style={{ fontWeight: "600" }}>
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
