import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UpcomingIcon from "@mui/icons-material/Upcoming";

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <UpcomingIcon />
      </ListItemIcon>
      <ListItemText primary="Upcoming" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Plant" />
    </ListItemButton>
  </>
);
