import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import { deletePlant } from "../store/plantSlice";
import {
  CardMedia,
  Typography,
  Container,
  Box,
  Grid,
  Button,
  Modal,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function PlantDetails() {
  const [plant, setPlant] = useState({});
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get(`api/plants/${id}`);
        setPlant(data);
      } catch (error) {}
    })();
  }, [id]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = (id) => {
    dispatch(deletePlant(id));
    handleClose();
    navigate("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} align="center">
          <Grid item xs={12}>
            <CardMedia
              component="img"
              height="500"
              image={plant.img_url}
              alt={plant.nickname}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              {plant.nickname}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ mb: 1.5, fontStyle: "italic" }}
              color="text.secondary"
            >
              {plant.species}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Water{" "}
              {plant.days_between_watering > 1
                ? `every ${plant.days_between_watering} days`
                : "everyday"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{plant.notes}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={() => navigate(`/dashboard/${id}/edit`)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={handleOpen} variant="contained" color="error">
              Delete
            </Button>
          </Grid>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Grid container spacing={2} align="center">
                <Grid item xs={12}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Are you sure?
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={() => handleDelete(plant.plant_id)}
                    variant="contained"
                    color="error"
                  >
                    Yes
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button onClick={handleClose} variant="contained">
                    No
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Grid>
      </Box>
    </Container>
  );
}
