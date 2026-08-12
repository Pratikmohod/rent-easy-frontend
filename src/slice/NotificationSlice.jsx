import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  fetchSingleNotification,
  updateNotification,
  deleteNotification,
  markAllNotificationsRead,
} from "../apiCalls/NotificationAPI";

let initialState = {
  notifications: [],
  singleNotification: null,

  loading: false,
  error: null,
  responseCode: null,
};

let notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    clearResponseCode: (state) => {
      state.responseCode = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSingleNotification: (state) => {
      state.singleNotification = null;
    },

    clearNotifications: (state) => {
      state.notifications = [];
      state.singleNotification = null;
      state.loading = false;
      state.error = null;
      state.responseCode = null;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notifications = action?.payload?.results;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to fetch notifications.";
      })

      .addCase(fetchSingleNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(fetchSingleNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleNotification = action?.payload;
      })
      .addCase(fetchSingleNotification.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to fetch single notifications.";
      })

      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 200;

        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id,
        );

        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
        state.singleNotification = action?.payload;
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to update single notifications.";
      })

      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 204;
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload,
        );
        state.singleNotification = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to delete single notifications.";
      })

      .addCase(markAllNotificationsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(markAllNotificationsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 200;
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          is_read: true,
        }));
      })
      .addCase(markAllNotificationsRead.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to mark notifications.";
      });
  },
});

export const { clearError, clearResponseCode, clearSingleNotification,clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
