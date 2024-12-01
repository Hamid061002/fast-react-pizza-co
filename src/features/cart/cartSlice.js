import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload)
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(item => item.pizzaId != action.payload)
    },
    increaseItemQuantity(state, action) {
      //payload = pizzzaId
      const item = state.cart.find(item => item.pizzaId == action.payload)
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzzaId
      const item = state.cart.find(item => item.pizzaId == action.payload)
      if (item.quantity == 1) cartSlice.caseReducers.deleteItem(state, action)
      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

/* redux selector functions - start with 'get' keyword */
export const getCart = state => state.cart.cart
export const getTotalPriceCart = state => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
export const getTotalQuantityCart = state => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
