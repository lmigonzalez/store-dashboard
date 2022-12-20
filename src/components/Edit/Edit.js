import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { editCustomer } from '../../features/customers/customersSlice';
import {editProduct} from '../../features/products/productsSlice'
import './Edit.css';

const Edit = ({ onCancel, component }) => {

  const dispatch = useDispatch()
  const [customerInformation, setCustomerInformation] = useState({});
  const [productInformation, setProductInformation] = useState({});

  useEffect(() => {
    if(component === 'customer'){
      let data = JSON.parse(localStorage.getItem('subjectName'));
      setCustomerInformation(data);
    }
    if(component === 'product'){
      let data = JSON.parse(localStorage.getItem('subjectName'));
      setProductInformation(data);
    }
    
  }, []);

  const onCustomerChange = (e) => {
    setCustomerInformation({
      ...customerInformation,
      [e.target.name]: e.target.value,
    });
  };

  const onProductChange = (e) => {
    setProductInformation({
      ...productInformation,
      [e.target.name]: e.target.value,
    });
  };

  const onCustomerSubmit = (e) => {
    e.preventDefault();
      dispatch(editCustomer(customerInformation))
      localStorage.setItem('subjectName', JSON.stringify(customerInformation));
    onCancel();
  };

  const onProductSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(productInformation))
    localStorage.setItem('subjectName', JSON.stringify(productInformation));
    onCancel();
  };



  const productToEdit = () => {
    return (
      <div className="edit-container">
        <div className="space-around" onClick={() => onCancel()}></div>
        <form onSubmit={onProductSubmit}>
          <input type="text" placeholder="Product name" value={productInformation.name} name="name" onChange={onProductChange}/>
          <div>
            <input type="number" placeholder="Quantity" value={productInformation.quantity} name="quantity" onChange={onProductChange}/>
            <input type="number" placeholder="Price" value={productInformation.price} name="price" onChange={onProductChange}/>
          </div>
          <select
            name="category"
            value={productInformation.category}
            onChange={onProductChange}
            className="edit-select"
          >
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="tobacco">Tobacco</option>
          </select>
          <button className="add-btn" type="submit">
            Edit
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  };

  const customerToEdit = () => {
    return (
      <div className="edit-container">
        <div className="space-around" onClick={() => onCancel()}></div>
        <form onSubmit={onCustomerSubmit}>
          <input
            type="text"
            placeholder="Customer Name"
            name="name"
            value={customerInformation.name}
            onChange={onCustomerChange}
          />
          <input
            type="email"
            placeholder="Customer Email"
            name="email"
            value={customerInformation.email}
            onChange={onCustomerChange}
          />

          <input
            type="tel"
            placeholder="Customer Phone"
            name="phone"
            value={customerInformation.phone}
            onChange={onCustomerChange}
          />

          <input
            type="text"
            placeholder="Customer Address"
            name="address"
            value={customerInformation.address}
            onChange={onCustomerChange}
          />
          <select
            name="plan"
            value={customerInformation.plan}
            onChange={onCustomerChange}
            className="edit-select"
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="advanced">Advanced</option>
          </select>
          <input
            type="date"
            placeholder="Date"
            value={customerInformation.date}
            name="date"
            onChange={onCustomerChange}
          />
          <button className="add-btn" type="submit">
            Edit
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {component === 'customer' && customerToEdit()}
      {component === 'product' && productToEdit()}
    </div>
  );
};

export default Edit;
