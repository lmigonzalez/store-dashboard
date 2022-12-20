import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const URL = 'http://localhost:3032/api/';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/getAll', async () => {
  const response = await axios.get(`${URL}products`);
  return response.data;
});

export const addNewProduct = createAsyncThunk(
  'products/addNew',
  async (newProduct) => {
    console.log(newProduct);
    const response = await axios.post(`${URL}new-product`, newProduct);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  const response = await axios.delete(`${URL}delete-product`, {
    data: { id },
  });
  return response.data;
});

export const editProduct = createAsyncThunk(
	'customer/edit',
	async (dataToEdit, state) => {
	  const { _id } = dataToEdit;
	  const response = await axios.patch(`${URL}edit-product`, dataToEdit);
	  return response.data;
	}
  );

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const loadedProducts = action.payload;
        state.products = loadedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products.splice(
          state.products.findIndex(
            (product) => product._id === action.payload
          ),
          1
        );
      })
	  .addCase(editProduct.pending, (state, action) => {
        state.status = 'loading';
      })
	  .addCase(editProduct.fulfilled, (state, action) => {
        // const { id } = action.payload;
        const updatedProduct = action.payload.result;
        state.status = 'succeeded';

        const index = state.products.findIndex(
          (element) => element._id === updatedProduct._id
        );
        state.products[index] = updatedProduct;
      });
  },
});

export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
