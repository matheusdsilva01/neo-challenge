import { createAppSlice } from '@/lib/redux/createAppSlice';
import { Comic } from '@/model/marvel/Comic';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem extends Comic {
  quantity: number
}

export interface CartSliceState {
  items: CartItem[]
}

const initialState: CartSliceState = {
  items: [],
}

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    addItem: create.reducer((state, action: PayloadAction<Omit<Comic, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }),
    increaseQuantity: create.reducer((state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) item.quantity += 1
    }),
    decreaseQuantity: create.reducer((state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    }),
    clearCart: create.reducer((state) => {
      state.items = []
    }),
  }),
  selectors: {
    selectCartItems: (cart) => cart.items,
    selectTotalItems: (cart) => cart.items.length,
    selectQuantityItemsFromId: (cart, id) => cart.items.find(el => el.id === id)?.quantity,
    selectTotalPrice: (cart) =>
      cart.items.reduce((total, item) => total + (item.prices.find(el => el.type === 'printPrice')?.price || 0), 0),
  },
})

export const {
  addItem,
  removeItem,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} = cartSlice.actions

export const {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  selectQuantityItemsFromId,
} = cartSlice.selectors
