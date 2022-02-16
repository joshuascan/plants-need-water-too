import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plantsList: [],
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    plantsFetched: (state, action) => {
      state.plantsList = action.payload;
    },
    plantAdded: (state, action) => {
      state.plantsList.push(action.payload);
    },
    plantUpdated: (state, action) => {
      state.plantsList = state.plantsList.map((plant) => {
        return plant.plant_id === action.payload.plant_id
          ? action.payload
          : plant;
      });
    },
    plantDeleted: (state, action) => {
      state.plantsList = state.plantsList.filter(
        (plant) => plant.plant_id !== action.payload.plant_id
      );
    },
  },
});
