import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Car, Favourite } from "./types";

axios.defaults.baseURL = "https://65a827e894c2c5762da861b8.mockapi.io/test";

export const getCars = createAsyncThunk(
  "cars/getAll",
  async (page: number, thunkAPI) => {
    try {
      const { data: cars } = await axios.get<Car[]>(`/cars?p=1&l=${page * 12}`);
      const { data: favourites } = await axios.get<Favourite[]>("/favourites");

      const carsWithFavourites = cars.map((car) => {
        const favourite = favourites.find(
          (favourite) => favourite.car_id === car.id
        );
        if (favourite) {
          return {
            ...car,
            favourite,
          };
        }

        return {
          ...car,
          favourite: {},
        };
      });

      return { cars: carsWithFavourites, favourites };
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

export const addToFavourites = createAsyncThunk(
  "cars/addToFavourites",
  async (car_id: number, thunkAPI) => {
    try {
      const { data } = await axios.post<Favourite>("/favourites", { car_id });
      return data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromFavourites = createAsyncThunk(
  "cars/removeFromFavourites",
  async (favourite_id: string, thunkAPI) => {
    try {
      const { data } = await axios.delete<Favourite>(
        `/favourites/${favourite_id}`
      );
      return data;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getByMake = createAsyncThunk(
  "cars/getByMake",
  async (make: string, thunkAPI) => {
    try {
      const { data: cars } = await axios.get<Car[]>(`/cars?make=${make}`);
      const { data: favourites } = await axios.get<Favourite[]>("/favourites");

      const carsWithFavourites = cars.map((car) => {
        const favourite = favourites.find(
          (favourite) => favourite.car_id === car.id
        );
        if (favourite) {
          return {
            ...car,
            favourite,
          };
        }

        return {
          ...car,
          favourite: {},
        };
      });

      return { cars: carsWithFavourites, favourites };
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
