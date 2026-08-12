import React from "react";
import NavbarLink from "./NavbarLink";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slice/userSlice";
import "./NavProfile.css";
import { clearNotifications } from "../../slice/NotificationSlice";

const Profile = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ProfileData = [
    {
      name: "My Profile",
      path: "/myProfile",
    },
  ];

  const loginSignupData = [
    {
      name: "Signup",
      path: "/",
    },
    {
      name: "Login",
      path: "/login",
    },
  ];

  const handleLogout = () => {

    // Remove authentication tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
   
    dispatch(clearNotifications());


    dispatch(logout());

    if (onClick) {
      onClick();
    }

    navigate("/login");

    
  };

  const isLoggedIn = Boolean(localStorage.getItem("access"));

  return (
    <div className="profile-navigation">
      {isLoggedIn ? (
        <>
          <NavbarLink
            data={ProfileData}
            onClick={onClick}
          />

          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </>
      ) : (
        <NavbarLink
          data={loginSignupData}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Profile;