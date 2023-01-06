import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartSlice'
import FavoutiteSlice from './FavoutiteSlice'

export default configureStore({
  reducer: {
    cart: CartSlice,
    favourite: FavoutiteSlice,
  },
})
