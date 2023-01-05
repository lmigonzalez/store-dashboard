import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getProductsStatus } from '../../features/products/productsSlice';
import { getCustomersStatus } from '../../features/customers/customersSlice';
import { populateMessage } from '../../features/notification/notification.Slice';
import { editCustomer } from '../../features/customers/customersSlice';
import {editProduct} from '../../features/products/productsSlice'
import editStyles from './Edit.module.css';

const Edit = ({ onCancel, component }) => {

  const dispatch = useDispatch()
  const productStatus = useSelector(getProductsStatus)
  const customerStatus = useSelector(getCustomersStatus)
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


      if(customerStatus === 'succeeded'){
        dispatch(
          populateMessage({
            message: 'Customer updated successfully',
            messageStatus: true,
            showNotification: true,
          })
        );
      }else if(customerStatus === 'rejected'){
        dispatch(
          populateMessage({
            message: "Customer wasn't added successfully",
            messageStatus: false,
            showNotification: true,
          })
        );
      }

    onCancel();
  };

  const onProductSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(productInformation))
    localStorage.setItem('subjectName', JSON.stringify(productInformation));

    if(productStatus === 'succeeded'){
      dispatch(
        populateMessage({
          message: 'Product updated successfully',
          messageStatus: true,
          showNotification: true,
        })
      );
    }else if(productStatus === 'rejected'){
      dispatch(
        populateMessage({
          message: "Product wasn't added successfully",
          messageStatus: false,
          showNotification: true,
        })
      );
    }
    onCancel();
  };



  const productToEdit = () => {
    return (
      <div className={editStyles.edit_container}>
        <div className={editStyles.space_around} onClick={() => onCancel()}></div>
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
            className={editStyles.edit_select}
          >
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="tobacco">Tobacco</option>
          </select>
          <button className={editStyles.add_btn} type="submit">
            Edit
          </button>
          <button
            type="button"
            className={editStyles.cancel_btn}
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
      <div className={editStyles.edit_container}>
        <div className={editStyles.space_around} onClick={() => onCancel()}></div>
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
            className={editStyles.edit_select}
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
          <button className={editStyles.add_btn} type="submit">
            Edit
          </button>
          <button
            type="button"
            className={editStyles.cancel_btn}
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
