import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import {
  CardMedia,
  Typography,
  Container,
  Box,
  Grid,
  Button,
} from "@mui/material";

export default function PlantDetails() {
  const [plant, setPlant] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get(`api/plants/${id}`);
        console.log(data);
        setPlant(data);
      } catch (error) {}
    })();
  }, [id]);

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
            <Button variant="contained">Edit</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
