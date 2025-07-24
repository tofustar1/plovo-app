import type {ApiDish, Dish} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from "./dishesThunks.ts";

interface DishesState {
  items: Dish[];
  oneDish: null | ApiDish;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean | string;
}

const initialState: DishesState = {
  items: [],
  oneDish: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
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
      .addCase(fetchOneDish.pending, (state) => {
        state.fetchOneLoading = true;
        state.oneDish = null;
      })
      .addCase(fetchOneDish.fulfilled, (state, {payload: ApiDish}) => {
        state.fetchOneLoading = false;
        state.oneDish = ApiDish;
      })
      .addCase(fetchOneDish.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(createDish.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(updateDish.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateDish.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateDish.rejected, (state) => {
        state.updateLoading = false;
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
      });
  },
  selectors: {
    selectDishes: (state) => state.items,
    selectOneDish: (state) => state.oneDish,
    selectFetchDishesLoading: (state) => state.fetchLoading,
    selectFetchOneDishLoading: (state) => state.fetchOneLoading,
    selectCreateDishLoading: (state) => state.createLoading,
    selectUpdateLoading: (state) => state.updateLoading,
    selectDeleteDishLoading: (state) => state.deleteLoading,
  }
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectDishes,
  selectFetchDishesLoading,
  selectDeleteDishLoading,
  selectCreateDishLoading,
  selectOneDish,
  selectFetchOneDishLoading,
  selectUpdateLoading
} = dishesSlice.selectors;