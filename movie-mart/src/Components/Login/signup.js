import React,{useState} from "react";
const Signup =() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };
    
      const handleLogin = () => {
        if (!validateEmail(email)) {
          setInvalidEmail(true);
        } else {
          // Perform login logic here
          // You can send a request to your backend to authenticate the user
        }
      };
  
return(
    <div>
        <div className="login-container">
      <div className="login-box">
        <h2>Signup</h2>
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
            <label>Name</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
            </div>
            
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
          <div className="form-group">
            <label>Confirm Password</label>
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
          <button onClick={handleLogin}>Create Account</button>
        </form>
      </div>
    </div>
    </div>
);
}
export default Signup;