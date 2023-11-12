import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
return (
    <div className="navbar"> 
       <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login"> Login </Link></li>
       </ul>
    </div>
);
}
export default Navbar;