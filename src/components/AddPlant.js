import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlant } from "../store/plantSlice";
import {
  Box,
  Button,
  Grid,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const initialFormValues = {
  nickname: "",
  species: "",
  days_between_watering: "",
  notes: "",
};

export default function AddPlant({ setIsAddPlantOpen }) {
  const [newPlant, setNewPlant] = useState(initialFormValues);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "days_between_watering") {
      setNewPlant({ ...newPlant, [name]: Number(value) });
    } else setNewPlant({ ...newPlant, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPlant(newPlant));
    setNewPlant(initialFormValues);
    setIsAddPlantOpen(false);
  };

  const handleCancel = () => {
    setNewPlant(initialFormValues);
    setIsAddPlantOpen(false);
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                value={newPlant.nickname}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="species"
                label="Species"
                name="species"
                value={newPlant.species}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="daysBetweenWatering"
                label="Days Between Watering"
                name="days_between_watering"
                value={newPlant.days_between_watering}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                id="notes"
                label="Notes"
                name="notes"
                value={newPlant.notes}
                onChange={handleChange}
                rows={4}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
          >
            Add Plant
          </Button>
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
