import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPlant } from "../store/plantSlice";
import {
  Box,
  Button,
  Grid,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AddPlant() {
  const { loading } = useSelector((state) => state.plants);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required("Nickname is required")
      .max(50, "Nickname must not exceed 50 characters"),
    species: Yup.string()
      .required("Species is required")
      .max(50, "Species must not exceed 100 characters"),
    days_between_watering: Yup.number()
      .required("Days between watering is required")
      .min(1, "Days between watering must be at least 1"),
    notes: Yup.string().max(250, "Notes must not exceed 250 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: "",
      species: "",
      days_between_watering: 1,
      notes: "",
      img_url: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    if (data.img_url === "") {
      const url =
        "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png";
      dispatch(addPlant({ ...data, img_url: url }));
    } else {
      dispatch(addPlant(data));
    }
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Plant
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 6 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="nickname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors.nickname ? true : false}
                    fullWidth
                    label="Nickname"
                    autoFocus
                  />
                )}
              />
              <Typography variant="inherit" color="error">
                {errors.nickname?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="species"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors.species ? true : false}
                    fullWidth
                    label="Species"
                  />
                )}
              />
              <Typography variant="inherit" color="error">
                {errors.species?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="days_between_watering"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors.days_between_watering ? true : false}
                    fullWidth
                    label="Days Between Watering"
                    type="number"
                  />
                )}
              />
              <Typography variant="inherit" color="error">
                {errors.days_between_watering?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    multiline
                    {...field}
                    error={errors.notes ? true : false}
                    label="Notes (optional)"
                    rows={4}
                  />
                )}
              />
              <Typography variant="inherit" color="error">
                {errors.notes?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="img_url"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    label="Image URL (optional)"
                  />
                )}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            loading={loading}
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
          >
            Add Plant
          </LoadingButton>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={handleCancel}>Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
