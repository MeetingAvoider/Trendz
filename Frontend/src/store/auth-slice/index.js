import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const signinUser = createAsyncThunk("auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/signin",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  console.log("I am insdie check auth page");
  const response = await axios.get(
    "https://localhost:5000/api/auth/auth-check",
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store no-cache must-revalidate proxy-revalidate",
        Expires: "0",
      },
    }
  );
  console.log(response.data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        console.log(action);

        state.isAuthenticated = action.payload.success;
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
