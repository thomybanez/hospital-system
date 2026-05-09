import { useState } from "react";

export default function Login({ onLogin, loading, error }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password, isRegister ? "register" : "login");
    }
  };

  const s = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      fontFamily: "inherit",
    },
    form: {
      background: "#fff",
      padding: "2rem",
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: 350,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    input: {
      padding: "10px 12px",
      border: "1px solid #c5d9f0",
      borderRadius: 8,
      fontSize: 14,
    },
    button: {
      padding: "12px",
      border: "none",
      borderRadius: 8,
      background: "#1a1a2e",
      color: "#fff",
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      marginTop: "0.5rem",
    },
    error: {
      color: "#e74c3c",
      fontSize: 13,
      textAlign: "center",
    },
    toggle: {
      background: "none",
      border: "none",
      color: "#4a90d9",
      fontSize: 13,
      cursor: "pointer",
      fontWeight: 600,
      marginTop: "0.5rem",
    }
  };

  return (
    <div style={s.container}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>Hospi-Sys</h1>
        <p style={{ color: "#7a8499", fontSize: 14 }}>
          {isRegister ? "Create a new account" : "Please sign in to continue"}
        </p>
      </div>
      
      <form style={s.form} onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#7a8499" }}>USERNAME</label>
          <input
            style={s.input}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#7a8499" }}>PASSWORD</label>
          <input
            style={s.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div style={s.error}>{error}</div>}

        <button style={s.button} type="submit" disabled={loading}>
          {loading ? "Processing..." : (isRegister ? "Register & Save" : "Login")}
        </button>

        <button
          type="button" 
          style={s.toggle} 
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "Need to register? Save new user"}
        </button>
      </form>
    </div>
  );
}

