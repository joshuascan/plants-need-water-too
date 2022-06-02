import { createSlice } from "@reduxjs/toolkit";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const initialState = {
  plantsList: [],
  loading: null,
};

const plantsSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    setLoading: (plants) => {
      plants.loading = !plants.loading;
    },
    plantsFetched: (plants, action) => {
      plants.plantsList = action.payload;
    },
    plantAdded: (plants, action) => {
      plants.plantsList.push(action.payload);
    },
    plantEdited: (plants, action) => {
      plants.plantsList = plants.plantsList.map((plant) => {
        return plant.plant_id === action.payload.plant_id
          ? action.payload
          : plant;
      });
    },
    plantDeleted: (plants, action) => {
      plants.plantsList = plants.plantsList.filter(
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
  dispatch(setLoading());
  axiosWithAuth()
    .post("/api/plants/", newPlant)
    .then((res) => {
      dispatch(plantAdded(res.data));
      dispatch(setLoading());
    })
    .catch((error) => {
      console.log(error);
      dispatch(setLoading());
    });
};

export const editPlant = (id, editedPlant) => (dispatch) => {
  dispatch(setLoading());
  axiosWithAuth()
    .put(`/api/plants/${id}`, editedPlant)
    .then((res) => {
      dispatch(plantEdited(res.data));
      dispatch(setLoading());
    })
    .catch((error) => {
      console.log(error);
      dispatch(setLoading());
    });
};

export const deletePlant = (id) => (dispatch) => {
  axiosWithAuth()
    .delete(`/api/plants/${id}`)
    .then((res) => dispatch(plantDeleted(res.data)))
    .catch((error) => console.log(error));
};

export const {
  setLoading,
  plantsFetched,
  plantAdded,
  plantEdited,
  plantDeleted,
} = plantsSlice.actions;

export default plantsSlice.reducer;
