import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerSuccess: null,
  loginSuccess: null,
  status: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
