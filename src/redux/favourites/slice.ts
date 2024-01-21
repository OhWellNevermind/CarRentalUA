import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Car, Favourite } from "../cars/types";
import { getFavourites } from "./operations";
import { removeFromFavourites } from "../cars/operations";

interface FavouritesState {
  favourites: Car[];
  page: number;
}

const initialState: FavouritesState = {
  favourites: [],
  page: 1,
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    loadMore: (state: FavouritesState) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getFavourites.fulfilled,
        (state: FavouritesState, action: PayloadAction<Car[]>) => {
          state.favourites = action.payload;
        }
      )
      .addCase(getFavourites.rejected, (_, action) => {
        if (action.payload) {
          toast.error(action.payload as string);
        }
        return;
      })
      .addCase(
        removeFromFavourites.fulfilled,
        (state: FavouritesState, action: PayloadAction<Favourite>) => {
          state.favourites = state.favourites.filter(
            (favourite) => favourite?.favourite?.id !== action.payload.id
          );
        }
      ),
});

export const { loadMore } = favouritesSlice.actions;

export const favouritesReducer = favouritesSlice.reducer;
