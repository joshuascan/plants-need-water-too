import React from "react";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import PlantsDisplay from "./PlantsDisplay";

export default function Dashboard() {
  return (
    <div>
      <PrimarySearchAppBar />
      <PlantsDisplay />
    </div>
  );
}
