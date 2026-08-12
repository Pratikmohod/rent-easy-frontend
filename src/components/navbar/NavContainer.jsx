import React, { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import NavProfile from "./NavProfile";
import "./NavContainer.css";


const NavContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="nav-container">
      {/* Main Navbar */}
      <div className="navbar-main">
        {/* Logo */}
        <div className="navbar-logo">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-navigation">
          <Navigation />
        </div>

        {/* Desktop Profile */}
        <div className="desktop-profile">
          <NavProfile />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
        >
          {isMenuOpen ? (
            <i className="fa-solid fa-x" style={{color: "rgb(0, 0, 0)"}}
            ></i>) : (<i
               className="fa-solid fa-bars" style={{color: "rgb(0, 0, 0)"}}></i>
               )}
         
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {/* Navigation */}
          <div className="mobile-navigation">
            <Navigation onClick={closeMenu} />
          </div>

          {/* Divider */}
          <div className="mobile-divider"></div>

          {/* Profile */}
          <div className="mobile-profile">
            <NavProfile onClick={closeMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavContainer;