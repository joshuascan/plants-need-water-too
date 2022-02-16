import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

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

export const fetchPlants = () => (dispatch) => {
  axiosWithAuth()
    .get("/api/plants")
    .then((res) => dispatch(plantsFetched(res.data)));
};

export const { plantsFetched, plantAdded, plantUpdated, plantDeleted } =
  plantsSlice.actions;

export default plantsSlice.reducer;
