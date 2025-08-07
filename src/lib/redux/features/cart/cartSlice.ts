import { createAppSlice } from '@/lib/redux/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartSliceState {
  items: CartItem[];
}

const initialState: CartSliceState = {
  items: [
    {
      id: 'edfredwq',
      name: 'adsfsdas',
      price: 20.5,
      quantity: 200
    }
  ],
};

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }),
    increaseQuantity: create.reducer((state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    }),
    decreaseQuantity: create.reducer((state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    }),
    clearCart: create.reducer((state) => {
      state.items = [];
    }),
  }),
  selectors: {
    selectCartItems: (cart) => cart.items,
    selectTotalItems: (cart) => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    selectTotalPrice: (cart) =>
      cart.items.reduce((total, item) => total + item.quantity * item.price, 0),
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} = cartSlice.selectors;
