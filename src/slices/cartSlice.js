import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

// https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    changeQuantity(state, action) {
      const item = state.find((i) => i.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },
    clearCart: () => initialState,
    removeItem: (state, action) => state.filter((item) => item.id !== action.payload),
  },
});

export const {
  addItem, removeItem, changeQuantity, clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
