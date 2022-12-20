import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuth: true
}


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:{
		logout: (state) => {
			state.isAuth = false
		},
		login: (state) => {
			state.isAuth = true
		},
	}
})



export const { logout, login } =
  authSlice.actions;

export default authSlice.reducer;