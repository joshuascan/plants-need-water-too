import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

export default function PlantCard({ plant }) {
  const navigate = useNavigate();

  const viewDetails = (id) => {
    navigate(`/plant-${id}`);
  };

  return (
    <Card elevation={3} sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => viewDetails(plant.plant_id)}>
        <CardMedia
          component="img"
          height="250"
          image={plant.img_url}
          alt={plant.nickname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {plant.nickname}
          </Typography>
          <Typography
            sx={{ mb: 1.5, fontStyle: "italic" }}
            color="text.secondary"
          >
            {plant.species}
          </Typography>
          <Typography>
            Water{" "}
            {plant.days_between_watering > 1
              ? `every ${plant.days_between_watering} days`
              : "everyday"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
