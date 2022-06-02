import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const initialState = {
  registerSuccess: null,
  loginSuccess: null,
  loading: false,
  errorMessage: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (users) => {
      users.loading = !users.loading;
    },
    register: (users, action) => {
      if (action.payload.attempt === false) users.registerSuccess = false;
      else users.registerSuccess = true;
    },
    resetRegister: (users) => {
      users.registerSuccess = null;
    },
    login: (users, action) => {
      if (action.payload.attempt === false) {
        users.loginSuccess = false;
        users.errorMessage = action.payload.message;
      } else {
        localStorage.setItem("token", action.payload.token);
        users.loginSuccess = true;
        users.errorMessage = "";
      }
    },
    logout: (users) => {
      localStorage.removeItem("token");
      users.registerSuccess = null;
      users.loginSuccess = null;
    },
  },
});

export const userLogin = (inputs) => (dispatch) => {
  dispatch(setLoading());
  axiosWithAuth()
    .post("/api/auth/login", inputs)
    .then((res) => {
      dispatch(login(res.data));
      dispatch(setLoading());
    })
    .catch((err) => {
      dispatch(login({ attempt: false, message: err.response.data.message }));
      dispatch(setLoading());
    });
};

export const userRegister = (inputs) => (dispatch) => {
  dispatch(setLoading());
  axiosWithAuth()
    .post("/api/auth/register", inputs)
    .then(() => {
      dispatch(register({ attempt: true }));
      dispatch(setLoading());
    })
    .catch(() => {
      dispatch(register({ attempt: false }));
      dispatch(setLoading());
    });
};

export const { setLoading, register, resetRegister, login, logout } =
  usersSlice.actions;

export default usersSlice.reducer;
