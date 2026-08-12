import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export let fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        return rejectWithValue("Please login first");
      }

      const response = await fetch(`${BASEURL}/api/accounts/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(
          result.detail || result.error || "Failed to fetch Profile",
        );
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "SERVER ERROR");
    }
  },
);

export let editProfile = createAsyncThunk(
  "user/editProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        return rejectWithValue("Please login first");
      }

      const response = await fetch(`${BASEURL}/api/accounts/profile/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      console.log("PROFILE UPDATE RESPONSE:", data);
      
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export let deleteProfile = createAsyncThunk(
  "user/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        return rejectWithValue("Please login first");
      }

      const response = await fetch(`${BASEURL}/api/accounts/profile/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        return rejectWithValue(
          result.detail || result.error || "DELETE FAILED",
        );
      }

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      return true;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);
