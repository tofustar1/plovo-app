import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import type {Dish, DishesList} from "../types";
import type {AppDispatch} from "../app/store.ts";
import {updateCart} from "./cartSlice.ts";

export const fetchDishes = createAsyncThunk<Dish[], undefined, {dispatch: AppDispatch}>(
  'dishes/fetchAll',
  async (_, thunkAPI) => {
    const { data } = await axiosApi.get<DishesList | null>('/dishes.json');

    let newDishes: Dish[] = [];

    if (data) {
      newDishes = Object.keys(data).map((key) => ({...data[key], id: key }));
    }

    thunkAPI.dispatch(updateCart(newDishes));
    return newDishes;
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (id) => {
    await axiosApi.delete(`/dishes/${id}.json`);
  }
);