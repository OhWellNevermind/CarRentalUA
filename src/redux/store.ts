import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice";
import { favouritesReducer } from "./favourites/slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favourites: favouritesReducer,
  },
});
