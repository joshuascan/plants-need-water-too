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
    plantEdited: (state, action) => {
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
    .then((res) => dispatch(plantsFetched(res.data)))
    .catch((error) => console.log(error));
};

export const addPlant = (newPlant) => (dispatch) => {
  axiosWithAuth()
    .post("/api/plants/", newPlant)
    .then((res) => dispatch(plantAdded(res.data)))
    .catch((error) => console.log(error));
};

export const editPlant = (id, editedPlant) => (dispatch) => {
  axiosWithAuth()
    .put(`/api/plants/${id}`, editedPlant)
    .then((res) => dispatch(plantEdited(res.data)))
    .catch((error) => console.log(error));
};

export const deletePlant = (id) => (dispatch) => {
  axiosWithAuth()
    .delete(`/api/plants/${id}`)
    .then((res) => dispatch(plantDeleted(res.data)))
    .catch((error) => console.log(error));
};

export const { plantsFetched, plantAdded, plantEdited, plantDeleted } =
  plantsSlice.actions;

export default plantsSlice.reducer;
