import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editPlant } from "../store/plantSlice";
import { axiosWithAuth } from "../auth/axiosWithAuth";
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

export default function EditPlant() {
  const [editedPlant, setEditedPlant] = useState(initialFormValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get(`api/plants/${id}`);
        if (data.notes === null) {
          data.notes = "";
        }
        if (data.img_url === null) {
          data.img_url = "";
        }
        setEditedPlant(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "days_between_watering") {
      setEditedPlant({ ...editedPlant, [name]: Number(value) });
    } else setEditedPlant({ ...editedPlant, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editPlant(id, editedPlant));
    navigate(`/dashboard/${id}`);
  };

  const handleCancel = () => {
    navigate(`/dashboard/${id}`);
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
          Edit Plant
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
                value={editedPlant.nickname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="species"
                label="Species"
                name="species"
                value={editedPlant.species}
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
                value={editedPlant.days_between_watering}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                id="notes"
                label="Notes (optional)"
                name="notes"
                value={editedPlant.notes}
                onChange={handleChange}
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="imgUrl"
                label="Image URL (optional)"
                name="img_url"
                value={editedPlant.img_url}
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
            Submit
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
