import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/homePage" className="logo-link">
      <div className="logo">
        Rent<span>Easy</span>
      </div>
    </Link>
  );
};

export default Logo;