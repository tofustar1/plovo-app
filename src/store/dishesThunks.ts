import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import type {ApiDish, Dish, DishesList} from "../types";
import type {AppDispatch} from "../app/store.ts";
import {updateCart} from "./cartSlice.ts";

interface UpdateDishParams {
  id: string;
  dish: ApiDish;
}

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

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  'dishes/fetchOne',
  async (id) => {
    const {data: dish} = await axiosApi<ApiDish | null>(`/dishes/${id}.json`);

    if (!dish) {
      throw new Error('Not found');
    }

    return dish;
  }
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (apiDish) => {
    await axiosApi.post('/dishes.json', apiDish);
  }
);

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  'dishes/update',
  async ({id, dish}) => {
    await axiosApi.put(`/dishes/${id}.json`, dish);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (id) => {
    await axiosApi.delete(`/dishes/${id}.json`);
  }
);