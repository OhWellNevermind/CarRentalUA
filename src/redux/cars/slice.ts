import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car, Favourite } from "./types";
import {
  addToFavourites,
  getByMake,
  getCars,
  removeFromFavourites,
} from "./operations";
import toast from "react-hot-toast";

interface CarsState {
  cars: Car[];
  page: number;
  favourites: Favourite[];
}

const initialState: CarsState = {
  cars: [],
  page: 1,
  favourites: [],
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
    builder
      .addCase(
        getCars.fulfilled,
        (
          state: CarsState,
          action: PayloadAction<{ cars: Car[]; favourites: Favourite[] }>
        ) => {
          state.cars = action.payload.cars;
          state.favourites = action.payload.favourites;
        }
      )
      .addCase(getCars.rejected, (_, action) => {
        if (action.payload) {
          toast.error(action.payload as string);
        }
        return;
      })
      .addCase(
        addToFavourites.fulfilled,
        (state: CarsState, action: PayloadAction<Favourite>) => {
          console.log(action.payload);
          state.favourites = [...state.favourites, action.payload];
          state.cars = state.cars.map((car) => {
            const favourite = action.payload;
            if (favourite.car_id === car.id) {
              return {
                ...car,
                favourite,
              };
            }

            return {
              ...car,
            };
          });
        }
      )
      .addCase(
        removeFromFavourites.fulfilled,
        (state: CarsState, action: PayloadAction<Favourite>) => {
          state.favourites = state.favourites.filter(
            (favourite) => favourite.id !== action.payload.id
          );
          state.cars = state.cars.map((car) => {
            const favourite = action.payload;
            if (favourite.car_id === car.id) {
              return {
                ...car,
                favourite: {},
              };
            }

            return {
              ...car,
            };
          });
        }
      )
      .addCase(
        getByMake.fulfilled,
        (
          state: CarsState,
          action: PayloadAction<{ cars: Car[]; favourites: Favourite[] }>
        ) => {
          state.cars = action.payload.cars;
          state.favourites = action.payload.favourites;
        }
      ),
});

export const { loadMore } = carsSlice.actions;

export const carsReducer = carsSlice.reducer;
