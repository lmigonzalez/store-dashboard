import React, { useState } from 'react';
import addCustomerStyles from './AddCustomer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomersStatus } from '../../../features/customers/customersSlice';
import { populateMessage } from '../../../features/notification/notification.Slice';
import { addNewCustomer } from '../../../features/customers/customersSlice';
import moment from 'moment';

const AddCustomer = () => {
  const dispatch = useDispatch();
  const customerStatus = useSelector(getCustomersStatus);

  const customerInitialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    plan: 'standard',
    date: moment().format('YYYY-MM-DD'),
  };

  const [customerValues, setCustomerValues] = useState(customerInitialValues);

  const onCustomerChange = (e) => {
    if (e.target.name === 'phone') {
      parseInt(e.target.value);
    }
    setCustomerValues({
      ...customerValues,
      [e.target.name]: e.target.value,
    });
  };

  const onCustomerSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCustomer(customerValues));
    console.log(customerStatus)
    if (customerStatus === 'succeeded') {
      dispatch(
        populateMessage({
          message: 'Customer added successfully',
          messageStatus: true,
          showNotification: true,
        })
      );
    } else if (customerStatus === 'rejected') {
      dispatch(
        populateMessage({
          message: "The customer wasn't added successfully",
          messageStatus: false,
          showNotification: true,
        })
      );
    }

    setCustomerValues(customerInitialValues);
  };

  return (
    <form onSubmit={onCustomerSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        name="name"
        value={customerValues.name}
        onChange={onCustomerChange}
      />
      <input
        type="email"
        placeholder="Customer Email"
        name="email"
        value={customerValues.email}
        onChange={onCustomerChange}
      />

      <input
        type="tel"
        placeholder="Customer Phone"
        name="phone"
        value={customerValues.phone}
        onChange={onCustomerChange}
      />

      <input
        type="text"
        placeholder="Customer Address"
        name="address"
        value={customerValues.address}
        onChange={onCustomerChange}
      />
      <select
        name="plan"
        value={customerValues.plan}
        onChange={onCustomerChange}
        className={addCustomerStyles.select}
      >
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
        <option value="advanced">Advanced</option>
      </select>
      <input
        type="date"
        placeholder="Date"
        value={customerValues.date}
        name="date"
        onChange={onCustomerChange}
      />
      <div className={addCustomerStyles.add_button_container}>
        <button type="submit">Add Customer</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default AddCustomer;
