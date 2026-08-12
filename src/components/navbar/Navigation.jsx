import React from "react";
import NavbarLink from "./NavbarLink";
import { useSelector } from "react-redux";
import "./Navigation.css";

const Navigation = ({ onClick }) => {
  const singleUser = useSelector(
    (state) => state.user?.singleUser
  );

  const notifications = useSelector(
    (state) => state.notifications?.notifications || []
  )

  const unreadCount = notifications.filter(
    (notification) => notification.is_read === false
  ).length ;

  
  const navigationData = [
    {
      name: "Home",
      path: "/homePage",
    },
    {
      name: "Properties",
      path: "/properties",
    },

    // Tenant only links
    ...(singleUser?.role === "tenant"
      ? [
          {
            name: "My Bookings",
            path: "/my-bookings",
          },
          {
            name: "Favorites",
            path: "/favorites",
          },
        ]
      : []),

    // Landlord only links
    ...(singleUser?.role === "landlord"
      ? [
          {
            name: "Add Property",
            path: "/addProperty",
          },
          {
            name: "Booking Requests",
            path: "/landlord/bookings",
          },
        ]
      : []),

    {
      name: "Notifications",
      path: "/notifications",
      unreadCount,
    },
  ];

  return (
    <nav className="navigation">
      <NavbarLink
      data={navigationData}
      onClick={onClick}
      />

    


    </nav>
  );
};

export default Navigation;