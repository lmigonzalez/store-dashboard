import React, { useState } from 'react';
import moment from 'moment';

const AddCustomer = () => {
  const customerInitialValues = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    category: 'standard',
    date: moment().format('YYYY-MM-DD'),
  };

  const [customerValues, setCustomerValues] = useState(customerInitialValues);

  const onCustomerChange = (e) => {
    setCustomerValues({
      ...customerValues,
      [e.target.name]: e.target.value,
    });
  };

  const onCustomerSubmit = (e) => {
    e.preventDefault();
    console.log(customerValues);
  };

  return (
    <form onSubmit={onCustomerSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        name="customerName"
        value={customerValues.customerName}
        onChange={onCustomerChange}
      />
      <input
        type="email"
        placeholder="Customer Email"
        name="customerEmail"
        value={customerValues.customerEmail}
        onChange={onCustomerChange}
      />

      <input
        type="tel"
        placeholder="Customer Phone"
        name="customerPhone"
        value={customerValues.customerPhone}
        onChange={onCustomerChange}
      />

      <input
        type="text"
        placeholder="Customer Address"
        name="customerAddress"
        value={customerValues.customerAddress}
        onChange={onCustomerChange}
      />
      <select
        name="category"
        value={customerValues.category}
        onChange={onCustomerChange}
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
      <div className="add-button-container">
        <button type="submit">Add Customer</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default AddCustomer;
