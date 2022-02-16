import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const initialState = {
  registerSuccess: null,
  loginSuccess: null,
  loading: false,
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
    login: (users, action) => {
      if (action.payload.attempt === false) users.loginSuccess = false;
      else {
        localStorage.setItem("token", action.payload.token);
        users.loginSuccess = true;
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
    .catch(() => {
      dispatch(login({ attempt: false }));
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

export const { setLoading, register, login, logout } = usersSlice.actions;

export default usersSlice.reducer;
