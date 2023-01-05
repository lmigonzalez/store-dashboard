import React from 'react';
import deleteStyles from './Delete.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { getProductsStatus } from '../../features/products/productsSlice';
import { getCustomersStatus } from '../../features/customers/customersSlice';
import { populateMessage } from '../../features/notification/notification.Slice';
import { deleteCustomer } from '../../features/customers/customersSlice';
import { deleteProduct } from '../../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

const Delete = ({ category, item, id, onCancel }) => {
  const dispatch = useDispatch();
  const productStatus = useSelector(getProductsStatus);
  const customerStatus = useSelector(getCustomersStatus);
  const navigate = useNavigate();
  // const category = 'product'
  // const item = 'Lenovo Legion i7'

  const deleteItem = () => {
    if (category === 'customer') {
      dispatch(deleteCustomer(id));
      if (customerStatus === 'succeeded') {
        dispatch(
          populateMessage({
            message: 'Customer deleted successfully',
            messageStatus: true,
            showNotification: true,
          })
        );
        navigate(-1);
      } else if (customerStatus === 'rejected') {
        dispatch(
          populateMessage({
            message: "Customer wasn't deleted successfully",
            messageStatus: false,
            showNotification: true,
          })
        );
      }
    }
    if (category === 'product') {
      dispatch(deleteProduct(id));
      if (customerStatus === 'succeeded') {
        dispatch(
          populateMessage({
            message: 'Product deleted successfully',
            messageStatus: true,
            showNotification: true,
          })
        );
        navigate(-1);
      } else if (customerStatus === 'rejected') {
        dispatch(
          populateMessage({
            message: "Product wasn't deleted successfully",
            messageStatus: false,
            showNotification: true,
          })
        );
      }
    }
  };

  return (
    <div className={deleteStyles.delete_container}>
      <div>
        <p>{`Are you sure you want to delete ${category}: ${item}`}</p>
        <div className={deleteStyles.delete_btn_container}>
          <button onClick={deleteItem}>Delete</button>
          <button onClick={() => onCancel()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
