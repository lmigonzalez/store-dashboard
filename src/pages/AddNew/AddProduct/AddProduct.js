import React, { useState } from 'react';
import addProductStyles from './AddProduct.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getProductsStatus } from '../../../features/products/productsSlice';
import { populateMessage } from '../../../features/notification/notification.Slice';
import { addNewProduct } from '../../../features/products/productsSlice';
import moment from 'moment';

const AddProduct = () => {
  const dispatch = useDispatch()
  const productStatus = useSelector(getProductsStatus)

  const productInitialValues = {
    name: '',
    quantity: '',
    price: '',
    category: 'food',
    date: moment().format('YYYY-MM-DD'),
  };

  const [productValues, setProductValues] = useState(productInitialValues);

  const onProductChange = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value,
    });
  };

  const onProductSubmit = (e) => {
    e.preventDefault();
    productValues.quantity = parseInt(productValues.quantity)
    productValues.price = parseFloat(productValues.price)

    dispatch(addNewProduct(productValues))
    if(productStatus === 'succeeded'){
      dispatch(
        populateMessage({
          message: 'Product added successfully',
          messageStatus: true,
          showNotification: true,
        })
      );
    }else if(productStatus === 'rejected'){
      dispatch(
        populateMessage({
          message: "The product wasn't added successfully",
          messageStatus: false,
          showNotification: true,
        })
      );
    }
    setProductValues(productInitialValues)
  };

  return (
    <form onSubmit={onProductSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productValues.name}
        name="name"
        onChange={onProductChange}
      />
      <div></div>
      <div className={addProductStyles.child_input_container}>
        <input
          type="number"
          placeholder="Quantity"
          value={productValues.quantity}
          name="quantity"
          onChange={onProductChange}
        />
        <input
          type="number"
          placeholder="Price"
          value={productValues.price}
          name="price"
          onChange={onProductChange}
        />
      </div>

      <select
        value={productValues.category}
        name="category"
        onChange={onProductChange}
        className={addProductStyles.select}
      >
        <option value="food">Food</option>
        <option value="drink">Drink</option>
        <option value="tobacco">tobacco</option>
      </select>
      <input
        type="date"
        placeholder="Date"
        value={productValues.date}
        name="date"
        onChange={onProductChange}
      />
      <div className={addProductStyles.add_button_container}>
        <button type="submit">Add Product</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default AddProduct;
