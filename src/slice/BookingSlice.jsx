import { createSlice } from "@reduxjs/toolkit";
import {
  addBooking,
  fetchMyBookings,
  fetchSingleBooking,
  updateBooking,
  deleteBooking,
  fetchLandlordBookings,
  updateBookingStatus,
  cancelBooking,
} from "../apiCalls/BookingAPI";

let initialState = {
  bookings: [],
  landlordBookings: [],
  singleBooking: null,

  loading: false,
  error: null,
  responseCode: null,
};

let bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearResponseCode: (state) => {
      state.responseCode = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSingleBooking: (state) => {
      state.singleBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 201;
        state.singleBooking = action.payload;
        state.bookings.unshift(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to add booking";
        state.responseCode = null;
      })

      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })

      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bookings = action?.payload.results || action.payload;
      })

      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to fetch booking";
        state.responseCode = null;
      })

      .addCase(fetchSingleBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })

      .addCase(fetchSingleBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleBooking = action.payload;
      })

      .addCase(fetchSingleBooking.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to fetch single booking";
        state.responseCode = null;
      })

      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })

      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id,
        );

        if (index !== -1) {
          state.bookings[index] = action.payload;
        }

        state.responseCode = 200;
        state.singleBooking = action.payload;
      })

      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to update booking";
        state.responseCode = null;
      })

      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload,
        );
        state.responseCode = 204;
        state.singleBooking = null;
      })

      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to delete booking";
        state.responseCode = null;
      })

      .addCase(fetchLandlordBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })

      .addCase(fetchLandlordBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 200;
        state.landlordBookings = action.payload.results || action.payload || [];
      })

      .addCase(fetchLandlordBookings.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to update booking";
        state.responseCode = null;
      })

      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 200;

        const index = state.landlordBookings.findIndex(
          (booking) => booking.id === action.payload.id,
        );

        if (index !== -1) {
          state.landlordBookings[index] = action.payload;
        }
      })

      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.detail ||
          action.error?.message ||
          "Failed to update booking status";
      })

      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 200;

        // Update booking in My Bookings
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id,
        );

        if (index !== -1) {
          state.bookings[index] = action.payload;
        }

        // Update currently opened booking
        if (
          state.singleBooking &&
          state.singleBooking.id === action.payload.id
        ) {
          state.singleBooking = action.payload;
        }
      })

      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.responseCode = null;

        state.error =
          action.payload?.detail ||
          action.payload?.error ||
          action.error?.message ||
          "Failed to cancel booking";
      });
  },
});

export const { clearError, clearResponseCode, clearSingleBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
