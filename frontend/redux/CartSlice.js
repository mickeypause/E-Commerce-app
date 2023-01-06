import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart(state, action) {
      state.products.push({
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        quantity: action.payload.quantity,
        finalPrice: action.payload.price,
      })
      state.totalPrice += action.payload.price
    },
    removeProductFromCart(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      )
    },
    increment(state, action) {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      )
      product.quantity += 1
      product.finalPrice = product.quantity * product.price
    },
    decrement(state, action) {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      )
      if (product.quantity > 1) {
        product.quantity -= 1
        product.finalPrice = product.quantity * product.price
      }
    },
    deleteAllProductsFromCart(state, action) {
      state.products = action.payload
      console.log(state.products)
    },
  },
})

// export actions you want to use
export const {
  addProductToCart,
  removeProductFromCart,
  increment,
  decrement,
  deleteAllProductsFromCart,
} = cartSlice.actions

export default cartSlice.reducer
