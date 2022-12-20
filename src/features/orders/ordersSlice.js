import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const URL = 'http://localhost:3032/api/';

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/getAll', async () => {
  const response = await axios.get(`${URL}orders`);
  return response.data;
});

export const addNewOrder = createAsyncThunk(
  'orders/addNew',
  async (newOrder) => {
    const response = await axios.post(`${URL}new-order`, newOrder);
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk('orders/delete', async (id) => {

  const response = await axios.delete(`${URL}delete-order`, {
    data: { id },
  });
  return response.data;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedOrders = action.payload;
        state.orders = loadedOrders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders.splice(
          state.orders.findIndex((order) => order._id === action.payload),
          1
        );
        state.status = 'succeeded';
      });
  },
});

export const selectAllOrders = (state) => state.orders.orders;
export const getOrdersStatus = (state) => state.orders.status;
export const getOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
