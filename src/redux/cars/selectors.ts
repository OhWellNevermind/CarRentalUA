import { AppState } from "./types";

export const selectCars = (state: AppState) => state.cars.cars;
