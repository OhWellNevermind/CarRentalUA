import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Car, Favourite } from "../cars/types";

export const getFavourites = createAsyncThunk(
  "favourite/getAll",
  async (page: number, thunkAPI) => {
    try {
      const { data: cars } = await axios.get<Car[]>(`/cars?p=1&l=${page * 12}`);
      const { data: favourites } = await axios.get<Favourite[]>("/favourites");

      const favouriteCars = cars.filter((car) => {
        const isFavourite = favourites.some(
          (favourite) => favourite.car_id === car.id
        );
        if (isFavourite) {
          return true;
        }

        return false;
      });

      const carsWithFavourites = favouriteCars.map((car) => {
        const favourite = favourites.find((item) => car.id === item.car_id);
        if (favourite) {
          return {
            ...car,
            favourite,
          };
        }
        return {
          ...car,
        };
      });

      return carsWithFavourites;
    } catch (err) {
      const error = err as Error | AxiosError;
      console.log(error);
      if (!axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
