import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://65a827e894c2c5762da861b8.mockapi.io/test";

export const getCars = createAsyncThunk("cars/getAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/cars");
    return res.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(error.message);
  }
});