import { createSlice } from "@reduxjs/toolkit";
import {
    fetchFavorites,
    addFavorite,
    deleteFavorite,

} from "../apiCalls/FavoriteAPI";
import { act } from "react";

const initialState = {
    favorites: [],
    loading:false,
    error:null,
    responseCode:null,
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,

    reducers:{
        clearResponseCode: (state) => {
            state.responseCode = null;
        },

        clearError: (state) => {
            state.error = null;

        },
    },

    extraReducers: (builder) => {
        builder

        // Fetch Favorites

        .addCase(fetchFavorites.pending, (state) => {
            state.loading=true;
            state.error = null;
            state.responseCode = null;
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
            state.loading=false;
            state.error = null;
            state.favorites = action.payload.results || action.payload;
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
            state.loading=false;
            state.error = 
            action.payload?.detail ||
            action.error?.message ||
            "Failed to fetch favorites.";
            
        })

        // ADD Favorites

        .addCase(addFavorite.pending, (state) => {
            state.loading=true;
            state.error = null;
            state.responseCode = null;
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
            state.loading=false;
            state.error = null;
            state.responseCode = 201;
            state.favorites.unshift(action.payload);
        })
        .addCase(addFavorite.rejected, (state, action) => {
            state.loading=false;
            state.error = 
            action.payload?.detail ||
            action.error?.message ||
            "Failed to add favorite.";
            
        })


        // Delete Favorite

        .addCase(deleteFavorite.pending, (state) => {
            state.loading=true;
            state.error = null;
            state.responseCode = null;
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
            state.loading=false;
            state.error = null;
            state.responseCode = 204;
            state.favorites = state.favorites.filter(
                (favorite) => favorite.id !== action.payload
            );
        })
        .addCase(deleteFavorite.rejected, (state, action) => {
            state.loading=false;
            state.error = 
            action.payload?.detail ||
            action.error?.message ||
            "Failed to delete favorite.";
            
        });
    },
});

export const {clearError, clearResponseCode } = favoriteSlice.actions;
export default favoriteSlice.reducer;