import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export let addUser = createAsyncThunk(
    "users/addUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${BASEURL}/api/accounts/register/`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue(result);
            }

            return {
                status: response.status,
                data: result
            };
            
        } catch (error) {
            return rejectWithValue({
                error: "SERVER ERROR",
            });
        }
    }
);

export let loginUser = createAsyncThunk(
    "users/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${BASEURL}/api/accounts/login/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                },

            );

            const result = await response.json()
            if (!response.ok) {
                return rejectWithValue(result);

            }
            localStorage.setItem("access", result.access);
            localStorage.setItem("refresh", result.refresh);

            return result;

        } catch (error) {
            return rejectWithValue({
                details : "SERVER ERROR",
            });
        }
    }
);