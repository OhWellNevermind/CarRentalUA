import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "./types";
import { getCars } from "./operations";

interface CarsState {
  cars: Car[];
  page: number;
}

const initialState: CarsState = {
  cars: [],
  page: 1,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    loadMore: (state: CarsState) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      getCars.fulfilled,
      (state: CarsState, action: PayloadAction<Car[]>) => {
        state.cars = action.payload;
      }
    ),
});

export const { loadMore } = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
