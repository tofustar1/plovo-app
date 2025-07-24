import type {Dish} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteDish, fetchDishes} from "./dishesThunks.ts";
import type {RootState} from "../app/store.ts";

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: boolean | string;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
        state.fetchLoading = false;
        state.items = dishes;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(deleteDish.pending, (state, {meta}) => {
        state.deleteLoading = meta.arg;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.deleteLoading = false;
      })
  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectFetchDishesLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;