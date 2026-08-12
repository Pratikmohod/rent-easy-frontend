import {createSlice} from "@reduxjs/toolkit";
import { addUser,loginUser } from "../apiCalls/UserApi";
import { fetchProfile,editProfile,deleteProfile } from "../apiCalls/ProfileAPI";


let initialState = {
    loading: false,
    singleUser: null,
    addResponse: null,
    accessToken: localStorage.getItem("access") || null,
    refreshToken: localStorage.getItem("refresh") || null,
    validationError: null,
    error:null,
    success:null,
};

let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.singleUser = null;
            state.addResponse = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.validationError = null;
            state.error = null;
            state.success = null;

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        },
        clearAddResponse: (state) => {
            state.addResponse = null;
        },
        clearMessages: (state) => {
            state.error = null;
            state.success = null;


        },
    },
    extraReducers: (builder) => {
        builder

        //ADD USER

        .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.validationError = null;
            
        })
        .addCase(addUser.fulfilled, (state,action) => {
            state.loading = false;
            state.addResponse = action?.payload;
            state.validationError = null;
            state.success = "Registration Successful";
            
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.validationError = action.payload && typeof action.payload === "object"
            ? action.payload
            : { non_field_errors: [action.payload || "Registration Failed"]};
            
        })

        // LOGIN
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.error = null;
            
            localStorage.setItem("access", action.payload.access);
            localStorage.setItem("refresh", action.payload.refresh);
        })

        .addCase(loginUser.rejected, (state,action) => {
            if (action.payload?.detail) {
                state.error = "Wrong Username or Password";

            } else {
                state.error = "Login Failed";
            }
            state.loading = false;
        })

        // Fetch Profile

        .addCase(fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fetchProfile.fulfilled, (state,action) => {
            state.loading = false;
            state.singleUser = action.payload;
            state.error = null;
            
        })
        .addCase(fetchProfile.rejected, (state,action) => {
            state.error = 
            action.payload?.detail ||
            action.payload?.message ||
            "Failed to fetch Profile";
            state.loading = false;
        })

        // Edit Profile

        .addCase(editProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            
        })
        .addCase(editProfile.fulfilled, (state,action) => {
            state.loading = false;
            state.singleUser = action.payload;
            state.error = null;
            state.success = "Profile Updated Successfully";

            
        })
        .addCase(editProfile.rejected, (state,action) => {
            state.error = 
            action.payload?.detail ||
            action.payload?.message ||
            "Failed to update Profile";
            state.loading = false;
        })


        // Delete Profile

        .addCase(deleteProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            
        })
        .addCase(deleteProfile.fulfilled, (state,action) => {
            state.loading = false;
            state.singleUser = null;
            state.error = null;
            state.accessToken=null;
            state.refreshToken=null;
            state.success = "Account Deleted Successfully";

            
        })
        .addCase(deleteProfile.rejected, (state,action) => {
            state.error = 
            action.payload?.detail ||
            action.payload?.message ||
            "Failed to delete Profile";
            state.loading = false;
        });


    },

});


export let {logout,clearAddResponse,clearMessages} = userSlice.actions;
export default userSlice.reducer;

