import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "./types";
import { getCars } from "./operations";

interface CarsState {
  cars: Car[];
}

const initialState: CarsState = {
  cars: [],
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      getCars.fulfilled,
      (state: CarsState, action: PayloadAction<Car[]>) => {
        state.cars = action.payload;
      }
    ),
});

export const carsReducer = carsSlice.reducer;
