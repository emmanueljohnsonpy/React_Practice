import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylestwo/AdminLogin.css"

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/admin/login/", {
        username,
        password,
      });

      // Save tokens to localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials or not an admin.");
    }
  };

  return (
    <div className="login-container" style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#e0e0e0', 
      fontFamily: 'Arial, sans-serif',
      padding: '0 20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '40px 30px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Admin Login</h1>
        {error && <div className="error-message" style={{
          color: 'red', 
          marginBottom: '15px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '12px', 
              marginBottom: '15px', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              width: '100%',
              fontSize: '16px'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '12px', 
              marginBottom: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              width: '100%',
              fontSize: '16px'
            }}
          />
          <button 
            type="submit" 
            style={{
              padding: '12px 0', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              width: '100%',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
    
    

  );
}

export default AdminLogin;


