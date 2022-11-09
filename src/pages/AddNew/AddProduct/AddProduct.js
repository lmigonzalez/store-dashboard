import React, { useState } from 'react';
import moment from 'moment';

const AddProduct = () => {
  const productInitialValues = {
    productName: '',
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
    console.log(productValues);
  };

  return (
    <form onSubmit={onProductSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productValues.productName}
        name="productName"
        onChange={onProductChange}
      />
      <div></div>
      <div className="child-input-container">
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
      <div className="add-button-container">
        <button type="submit">Add Product</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default AddProduct;
