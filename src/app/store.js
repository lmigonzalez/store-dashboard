import { configureStore } from "@reduxjs/toolkit";
import customersReducer from '../features/customers/customersSlice'
import productsReducer from '../features/products/productsSlice'

export const store = configureStore({
	reducer: {
		customers: customersReducer,
		products: productsReducer,
	},
})