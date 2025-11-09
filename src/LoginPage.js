import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Added for a complete form, though we won't validate it

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (username.trim()) {
      onLogin(username); // Pass the username to the parent (App.js)
    } else {
      alert("Please enter a username.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <h2>Office Planner Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="(any password)"
            />
          </div>
          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;