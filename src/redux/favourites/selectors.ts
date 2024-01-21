import { AppState } from "../cars/types";

export const selectFavouritePage = (state: AppState) => state.favourites.page;
export const selectFavourites = (state: AppState) =>
  state.favourites.favourites;
