import { createSlice } from "@reduxjs/toolkit";
import {
  addProperty,
  addPropertyImages,
  fetchProperties,
  fetchSingleProperty,
  updateProperty,
  deleteProperty,
} from "../apiCalls/PropertiesAPI";

let initialState = {
  properties: [],
  singleProperty: null,

  count: 0,
  next:null,
  previous:null,

  loading: false,
  error: null,
  responseCode: null,
};

let propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    clearResponseCode: (state) => {
      state.responseCode = null;
    },
    clearError: (state) => {
      state.error = null;
    },

    clearSingleProperty: (state) => {
      state.singleProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.responseCode = 201;
        state.loading = false;
        state.error = null;
        state.singleProperty = action.payload;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to add property";
      })

      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.properties = action.payload.results;

        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to fetch properties";
      })

      .addCase(fetchSingleProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleProperty = action.payload;
      })
      .addCase(fetchSingleProperty.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to fetch property";
      })

      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = 200;

        state.singleProperty = action.payload;

        const index = state.properties.findIndex(
          (property) => property.id === action.payload.id,
        );

        if (index !== -1) {
          state.properties[index] = action.payload;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.payload?.message ||
          action.payload?.detail ||
          "Failed to update property";
        state.responseCode = null
      })

      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.responseCode = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.responseCode = action.payload;

        state.singleProperty = null;
        state.properties = state.properties.filter(
          (property) => property.id !== action.meta.arg,
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error?.message ||
          action.error?.detail ||
          action.payload?.detail ||
          "Failed to delete property";
      })

      .addCase(addPropertyImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPropertyImages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.responseCode = 202;
        if (state.singleProperty) {
          if (!state.singleProperty.images) {
            state.singleProperty.images = [];
          }
          state.singleProperty.images.push(...action.payload);
        }
      })
      .addCase(addPropertyImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const { clearError, clearSingleProperty, clearResponseCode } =
  propertySlice.actions;
export default propertySlice.reducer;
