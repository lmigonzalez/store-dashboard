import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: '',
	email: '',
	id: '',
	securityQuestion: '',
	securityAnswer: '',
	isAdmin: false,
	isAuth: false
}


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:{
		logout: (state) => {
			state.isAuth = false
		},
		login: (state, action) => {
			state.name = action.payload.user.name
			state.email = action.payload.user.email
			state.id = action.payload.user.id
			state.isAdmin = action.payload.user.isAdmin
			state.securityQuestion = action.payload.user.securityQuestion
			state.securityAnswer = action.payload.user.securityAnswer
			state.isAuth = true
		},
		updateAccount: (state, action) =>{
			state.securityQuestion = action.payload.result.securityQuestion
			state.securityAnswer = action.payload.result.securityAnswer
			state.isAuth = true
		}
	}
})



export const { logout, login, updateAccount } =
  authSlice.actions;

  export const userInformation = (state) => state.auth;

export default authSlice.reducer;