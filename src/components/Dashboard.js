import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../store/plantSlice";

export default function Dashboard() {
  const plants = useSelector((state) => state.plants.plantsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);

  return (
    <div>
      {plants.map((plant) => (
        <div key={plant.plant_id}>{plant.nickname}</div>
      ))}
    </div>
  );
}
