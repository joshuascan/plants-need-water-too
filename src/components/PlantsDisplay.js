import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPlants } from "../store/plantSlice";
import PlantCard from "./PlantCard";
import { Grid, Container } from "@mui/material";

export default function PlantsDisplay({ filteredPlants }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);

  return (
    <Container sx={{ width: "1200px", mt: 15, mb: 10, flexGrow: 1 }}>
      <Grid container spacing={10} justifyContent="flex-start">
        {filteredPlants.map((plant) => (
          <Grid key={plant.plant_id} item xs={12} sm={6} md={4}>
            <PlantCard plant={plant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
