import type {CartDish, Dish} from "../types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../app/store.ts";

interface CartState {
  cartDishes: CartDish[]
}

const initialState: CartState = {
  cartDishes: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          dish,
          amount: 1
        });
      }
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
    updateCart: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];
      state.cartDishes.forEach(cartDish => {
        const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish
        });
      });

      state.cartDishes = newCartDishes;
    }
  }
});


export const cartReducer = cartSlice.reducer;
export const {addDish, clearCart, updateCart} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;