import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

const initialFormValues = {
  nickname: "",
  species: "",
  days_between_watering: "",
  notes: "",
  img_url: "",
};

export default function AddPlant() {
  const [newPlant, setNewPlant] = useState(initialFormValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "days_between_watering") {
      setNewPlant({ ...newPlant, [name]: Number(value) });
    } else setNewPlant({ ...newPlant, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPlant.img_url === "") {
      const url =
        "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png";
      dispatch(addPlant({ ...newPlant, img_url: url }));
    } else {
      dispatch(addPlant(newPlant));
    }
    setNewPlant(initialFormValues);
    navigate("/dashboard");
  };

  const handleCancel = () => {
    setNewPlant(initialFormValues);
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="imgUrl"
                label="Image URL"
                name="img_url"
                value={newPlant.img_url}
                onChange={handleChange}
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
