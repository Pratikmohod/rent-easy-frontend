import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export const addProperty = createAsyncThunk(
  "properties/addProperty",
  async (data) => {
    const token = localStorage.getItem("access");

    const response = await fetch(`${BASEURL}/api/properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create property");
    }
    return await response.json();
  },
);

export const addPropertyImages = createAsyncThunk(
  "properties/addPropertyImages",
  async ({ propertyId, formData }) => {
    const token = localStorage.getItem("access");

    const response = await fetch(
      `${BASEURL}/api/properties/${propertyId}/images/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    return await response.json();
  },
);

export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          query.append(key, value);
        }
      });

      const response = await fetch(
        `${BASEURL}/api/properties/?${query.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSingleProperty = createAsyncThunk(
  "properties/fetchSingleProperty",
  async (id) => {
    const response = await fetch(`${BASEURL}/api/properties/${id}/`);

    return await response.json();
  },
);

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/properties/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({
        detail: error.message || "Failed to update property",
      });
    }
  },
);

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id) => {
    const token = localStorage.getItem("access");

    const response = await fetch(`${BASEURL}/api/properties/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  },
);
