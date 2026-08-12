import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/notifications/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  },
);

export const fetchSingleNotification = createAsyncThunk(
  "notification/fetchSingleNotification",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/notifications/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  },
);

export const updateNotification = createAsyncThunk(
  "notification/updateNotification",
  async ({ id, notificationData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/notifications/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notificationData),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  },
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/notifications/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        return rejectWithValue(result);
      }

      return id;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  },
);

export const markAllNotificationsRead = createAsyncThunk(
  "notification/markAllNotificationsRead",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/notifications/mark-all-read/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  },
);
