import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../store/plantSlice";
import PlantCard from "./PlantCard";
import { Grid, Container } from "@mui/material";

export default function PlantsDisplay() {
  const plants = useSelector((state) => state.plants.plantsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);

  return (
    <Container sx={{ width: "fit-content", mt: 15, mb: 10, flexGrow: 1 }}>
      <Grid container spacing={10} justifyContent="space-between">
        {plants.map((plant) => (
          <Grid key={plant.plant_id} item xs={12} sm={6} md={4}>
            <PlantCard plant={plant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
