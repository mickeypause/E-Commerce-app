import { createSlice } from '@reduxjs/toolkit'

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: {
    products: [],
  },
  reducers: {
    addToFavourite(state, action) {
      state.products.push({
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
      })
      //const p = state.products.find((product) => product.id === action.payload.id)
    },
    removeFromFavourite(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      )
    },
    removeAllProductsFromFavourite(state, action) {
      state.products = action.payload
    },
  },
})

export const {
  addToFavourite,
  removeFromFavourite,
  removeAllProductsFromFavourite,
} = favouriteSlice.actions
export default favouriteSlice.reducer
