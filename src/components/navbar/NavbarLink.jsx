import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarLink.css";

const NavbarLink = ({ data, onClick }) => {
  return (
     <>
      {data.map((value) => (
        <div
          key={value.path}
          className="navbar-link-wrapper"
        >
          <NavLink
            to={value.path}
            onClick={onClick}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            {value.name}

            {value.name === "Notifications" &&
              value.unreadCount > 0 && (
                <span className="notification-badge">
                  {value.unreadCount > 20
                    ? "20+"
                    : value.unreadCount}
                </span>
              )}
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default NavbarLink;