import { AppState } from "./types";

export const selectCars = (state: AppState) => state.cars.cars;
export const selectPage = (state: AppState) => state.cars.page;
