import React, { useEffect } from "react";
import NavContainer from "../navbar/NavContainer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../apiCalls/ProfileAPI";
import { fetchNotifications } from "../../apiCalls/NotificationAPI";

const Layout = () => {

  const dispatch = useDispatch()

  const accessToken = useSelector(
    (state) => state.user?.accessToken
  );

  useEffect(() => {

    if (accessToken) {

      dispatch(fetchProfile());
      dispatch(fetchNotifications());
    }

  },[accessToken,dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header>
        <NavContainer />
      </header>
      {/* Page Content */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
