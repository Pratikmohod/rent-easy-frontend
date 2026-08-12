import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export const addBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`${BASEURL}/api/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json()

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;

    } catch (error) {
      return rejectWithValue({
        error: "Server ERROR",
      });
    }
  },
);


export const fetchMyBookings = createAsyncThunk(
    "booking/fetchMyBookings",
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                `${BASEURL}/api/bookings/`,
                {
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
            return rejectWithValue({
                error: "Server Error"
            });
        }
    }
);


export const fetchSingleBooking = createAsyncThunk(
    "booking/fetchSingleBooking",
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                `${BASEURL}/api/bookings/${id}/`,
                {
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
                error: "Server Error"
            });
        }
    }
);


export const updateBooking = createAsyncThunk(
    "booking/updateBooking",
    async ({id, bookingData},{rejectWithValue}) => {
        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                `${BASEURL}/api/bookings/${id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(bookingData),
                });

                const result = await response.json();

                if (!response.ok) {
                    return rejectWithValue(result);
                }

                return result;


        } catch (error) {
            return rejectWithValue({
                error: "Server Error"
            });
        }
    }
);


export const deleteBooking = createAsyncThunk(
    "booking/deleteBooking",
    async (id,{rejectWithValue}) => {
        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                `${BASEURL}/api/bookings/${id}/`,
                {
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
                error: "Server Error"
            });
        }
    }
);


export const fetchLandlordBookings = createAsyncThunk(
    "booking/fetchLandlordBookings",
    async (_,{rejectWithValue}) => {
        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                `${BASEURL}/api/bookings/landlord/`,
                {
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
                error: "Server Error"
            });
        }
    }
);


export const updateBookingStatus = createAsyncThunk(
    "booking/updateBookingStatus",
    async ({id, status },{rejectWithValue}) => {
        try {
            const token = localStorage.getItem("access");

            const response = await fetch(
                `${BASEURL}/api/bookings/${id}/status/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                });

                const result = await response.json();

                if (!response.ok) {
                    return rejectWithValue(result);
                }

                return result;


        } catch (error) {
            return rejectWithValue({
                error: "Server Error"
            });
        }
    }
);


export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        `${BASEURL}/api/bookings/${id}/cancel/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
  }
);