import { configureStore } from "@reduxjs/toolkit";
import customersReducer from '../features/customers/customersSlice'
import productsReducer from '../features/products/productsSlice'
import ordersReducer from '../features/orders/ordersSlice'

export const store = configureStore({
	reducer: {
		customers: customersReducer,
		products: productsReducer,
		orders: ordersReducer,
	},
})