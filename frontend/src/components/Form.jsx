import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  // const handleSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();

  //   if (method === "register" && password !== confirmPassword) {
  //     alert("Passwords do not match.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await api.post(route, { username, password });
  //     if (method === "login") {
  //       localStorage.setItem(ACCESS_TOKEN, res.data.access);
  //       localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
  //       navigate("/");
  //     } else {
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    // Check if passwords match during registration
    if (method === "register" && password !== confirmPassword) {
      alert("The passwords do not match. Please ensure both passwords are identical.");
      setLoading(false);
      return;
    }
  
    try {
      const res = await api.post(route, { username, password });
      
      // If login is successful
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        alert("Login successful! Welcome back.");
        navigate("/");
      } else {
        alert("Registration successful! Please log in with your new account.");
        navigate("/login");
      }
    } catch (error) {
      // Handling errors based on response status or message
      if (error.response) {
        // Server responded with an error status code
        if (error.response.status === 400) {
          alert("Invalid input. Please check your username or password.");
        } else if (error.response.status === 500) {
          alert("An internal error occurred. Please try again later.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        // Error when no response from server (network issue, etc.)
        alert("Unable to connect. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const toggleForm = () => {
    // Navigate to the opposite form (login/register)
    if (method === "login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {method === "register" && (
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        )}
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
          {name}
        </button>

        {/* Toggle between Login and Register forms */}
        <div className="form-toggle">
          {method === "login" ? (
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={toggleForm}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={toggleForm}>
                Login
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
