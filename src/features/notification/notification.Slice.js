import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  messageIsPositive: false,
  showNotification: false
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
	populateMessage: (state, action) =>{
		state.message = action.payload.message
		state.messageIsPositive = action.payload.messageStatus
		state.showNotification = action.payload.showNotification
	}
  },
});

export const { populateMessage } = notificationSlice.actions;

export const messageInformation = (state) => state.notification;


export default notificationSlice.reducer;
