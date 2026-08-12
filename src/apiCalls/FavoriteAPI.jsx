import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/favorites/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addFavorite = createAsyncThunk(
  "favorite/addFavorite",
  async (favoriteData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/favorites/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favoriteData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteFavorite = createAsyncThunk(
  "favorite/deleteFavorite",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/favorites/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
