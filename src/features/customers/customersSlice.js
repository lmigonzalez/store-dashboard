import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3032/api/';

const initialState = {
  customers: [],
  status: 'idle',
  error: null,
};

export const fetchCustomers = createAsyncThunk('customers/getAll', async () => {
  const response = await axios.get(`${URL}customers`);
  return response.data;
});

export const addNewCustomer = createAsyncThunk(
  'customers/addNew',
  async (newCustomer) => {
    const response = await axios.post(`${URL}new-customer`, newCustomer);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (id) => {
    const response = await axios.delete(`${URL}delete-customer`, {
      data: { id },
    });
    return response.data;
  }
);

export const editCustomer = createAsyncThunk(
  'customer/edit',
  async (dataToEdit, state) => {
    const { _id } = dataToEdit;
    const response = await axios.patch(`${URL}edit-customer`, dataToEdit);
    return response.data;
  }
);

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedCustomers = action.payload;
        state.customers = loadedCustomers;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        state.customers.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addNewCustomer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers.splice(
          state.customers.findIndex(
            (customer) => customer._id === action.payload
          ),
          1
        );
        state.status = 'succeeded';
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(editCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        // const { id } = action.payload;
        const updatedCustomer = action.payload.result;
        state.status = 'succeeded';

        const index = state.customers.findIndex(
          (element) => element._id === updatedCustomer._id
        );
        state.customers[index] = updatedCustomer;
      })
      .addCase(editCustomer.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAllCustomers = (state) => state.customers.customers;
export const getCustomersStatus = (state) => state.customers.status;
export const getCustomersError = (state) => state.customers.error;


export default customersSlice.reducer;
