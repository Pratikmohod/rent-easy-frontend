import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./../slice/UserSlice";
import propertySlice from "./../slice/PropertySlice";
import bookingSlice from "./../slice/BookingSlice";
import notificationSlice from "./../slice/NotificationSlice";
import favoriteSlice from "./../slice/FavoriteSlice";
let store = configureStore({
    reducer: {
        user: userSlice,
        properties: propertySlice,
        bookings: bookingSlice,
        notifications: notificationSlice,
        favorites: favoriteSlice,


    },
});

export default store;