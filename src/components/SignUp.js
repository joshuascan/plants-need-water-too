import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { userRegister, resetRegister } from "../store/userSlice";
import {
  Avatar,
  Box,
  Grid,
  Link as MaterialLink,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlined from "@mui/icons-material/LockOutlined";

const theme = createTheme();

export default function SignIn() {
  const { registerSuccess, loading } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required")
      .max(30, "First name must not exceed 30 characters"),
    last_name: Yup.string()
      .required("Last name is required")
      .max(30, "Last name must not exceed 50 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters"),
    confirm_password: Yup.string()
      .required("Must confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const newUser = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };
    dispatch(userRegister(newUser));
    setTimeout(() => {
      dispatch(resetRegister());
    }, 3000);
  };

  useEffect(() => {
    if (registerSuccess) navigate("/");
  }, [registerSuccess, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 6 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="First Name"
                      {...field}
                      error={errors.first_name ? true : false}
                      autoComplete="given-name"
                      autoFocus
                    />
                  )}
                />
                <Typography variant="inherit" color="error">
                  {errors.first_name?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      error={errors.last_name ? true : false}
                      autoComplete="family-name"
                    />
                  )}
                />
                <Typography variant="inherit" color="error">
                  {errors.last_name?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email Address"
                      error={errors.email ? true : false}
                      autoComplete="email"
                    />
                  )}
                />
                <Typography variant="inherit" color="error">
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      error={errors.password ? true : false}
                      autoComplete="current-password"
                    />
                  )}
                />
                <Typography variant="inherit" color="error">
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      error={errors.confirm_password ? true : false}
                      autoComplete="current-password"
                    />
                  )}
                />
                <Typography variant="inherit" color="error">
                  {errors.confirm_password?.message}
                </Typography>
              </Grid>
            </Grid>
            <LoadingButton
              onClick={handleSubmit(onSubmit)}
              type="submit"
              loading={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="center">
              <Grid item>
                <MaterialLink component={RouterLink} to="/" variant="body2">
                  Already have an account? Sign in
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
