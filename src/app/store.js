import { configureStore } from "@reduxjs/toolkit";
import customersReducer from '../features/customers/customersSlice'
import productsReducer from '../features/products/productsSlice'
import ordersReducer from '../features/orders/ordersSlice'
import authReducer from "../features/auth/authSlice";
import notificationReducer from "../features/notification/notification.Slice";

export const store = configureStore({
	reducer: {
		customers: customersReducer,
		products: productsReducer,
		orders: ordersReducer,
		auth: authReducer,
		notification: notificationReducer

	},
})