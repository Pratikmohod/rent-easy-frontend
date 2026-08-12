import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import MyProfile from "../components/myprofile/MyProfile";
import EditProfile from "../components/myprofile/EditProfile";
import AddProperty from "../pages/landlord/AddProperty";
import HomePage from "../pages/homepage/HomePage";
import Properties from "../pages/properties/Properties";
import SingleProperty from "../pages/properties/SingleProperty";
import EditSingleProperty from "../pages/properties/EditSingleProperty";
import BookProperty from "../pages/tenantpages/BookProperty";
import MyBookings from "../pages/tenantpages/MyBookings";
import BookingDetails from "../pages/tenantpages/BookingDetails";
import EditBooking from "../pages/editbookingpage/EditBooking";
import LandlordBookings from "../pages/landlord/LandlordBookings";
import LandlordBookingDetails from "../pages/landlord/LandlordBookingDetails";
import Notification from "../pages/notifications/Notification";
import NotificationDetails from "../pages/notifications/NotificationDetails";
import Favorites from "../pages/favoritespage/Favorites";


let Route = createBrowserRouter([
    {
        path: "/",
        element:<Layout/>,
        children: [
            {
                index:true,
                element: <Register/>,
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/myProfile",
                element: <MyProfile/>
            },
            {
                path: "/editProfile",
                element: <EditProfile/>
            },
            {
                path: "/addProperty",
                element: <AddProperty/>
            },
            {
                path: "/homePage",
                element: <HomePage/>
            },
            {
                path: "/properties",
                element: <Properties/>
            },
            {
                path: "/properties/:id",
                element: <SingleProperty/>
            },
            {
                path: "/editSingleProperty/:id",
                element: <EditSingleProperty/>
            },
            {
                path: "/properties/:id/book",
                element: <BookProperty/>
            },
            {
                path: "/my-bookings",
                element: <MyBookings/>
            },
            {
                path: "/my-bookings/:id",
                element: <BookingDetails/>
            },
            {
                path: "/my-bookings/:id/edit",
                element: <EditBooking/>
            },
            {
                path: "/landlord/bookings",
                element: <LandlordBookings/>
            },
            {
                path: "/landlord/bookings/:id",
                element: <LandlordBookingDetails/>
            },
            {
                path: "/notifications",
                element: <Notification/>
            },
            {
                path: "/notifications/:id",
                element: <NotificationDetails/>
            },
            {
                path: "/favorites",
                element: <Favorites/>
            },
            

        ],
    },
]);

export default Route;