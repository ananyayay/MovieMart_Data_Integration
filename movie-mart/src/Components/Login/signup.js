import React,{useState} from "react";
import axios from "axios";
const Signup =() => {
    const [email, setEmail] = useState("");
    const [username,setUserName] = useState("");
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
    
      const handleSignUp = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
          setInvalidEmail(true);
        } else {
         console.log("Everything is cool");
         axios
         .get("http://127.0.0.1:5000/signup", { params: { username,email,password } })
         .then((response) => {
           console.log(response.data);
         })
         .catch((error) => {
           console.error("Error:", error.message);
           
         });
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
            <label>UserName</label>
            <div className="password-input">
              <input
                
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
          <button onClick={handleSignUp}>Create Account</button>
        </form>
      </div>
    </div>
    </div>
);
}
export default Signup;