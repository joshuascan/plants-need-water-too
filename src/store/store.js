import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import plantsReducer from "./plantSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    plants: plantsReducer,
  },
});
