import React, { useState } from "react";
import "./login.css"; 
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const {login, user} = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setInvalidEmail(true);
    } else {
      login(email,password);
      // Perform login logic here
      // You can send a request to your backend to authenticate the user
    }
  };

  return (
    <div>
      {!user?
      <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className={`form-group ${invalidEmail ? "invalid" : ""}`}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {invalidEmail && <span className="error-text">Incorrect email</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`password-toggle ${
                  showPassword ? "show" : "hide"
                }`}
                onClick={togglePasswordVisibility}
              >
                👁️
              </i>
            </div>
          </div>
          <button onClick={handleLogin}>Login</button>
        </form>
        <p>
          Don't have an account? Click <a href="/signup">here</a> to signup.
        </p>
      </div>
    </div>

       :<h2 style={{color:"black"}}>Welcome, {user}!</h2>}
        </div>
  );
};

export default Login;
