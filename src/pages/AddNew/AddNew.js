import './AddNew.css';

import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { orderProductNameSuggestion } from '../../utils/searchSuggestions';
import { orderClientNameSuggestion } from '../../utils/searchSuggestions';

const AddNew = () => {
  const [activeTab, setActiveTab] = useState('order');

  const [productForms, setProductForms] = useState(3);
  // let productForms = 2

  // const orderListInitialValues = numberOfOrders()

  const orderInitialValues = {
    clientName: '',
    // orders: numberOfOrders(),
    date: moment().format('YYYY-MM-DD'),
  };

  const productInitialValues = {
    productName: '',
    quantity: '',
    price: '',
    category: 'food',
    date: moment().format('YYYY-MM-DD'),
  };

  const customerInitialValues = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    category: 'standard',
    date: moment().format('YYYY-MM-DD'),
  };

  const productNameSuggestionsValues = [
    'Pizza',
    'Coca Cola',
    'Tacos',
    'Chicken',
    'Sandwich',
  ];

  const clientNameSuggestionsValues = [
    'Juan',
    'Eduardo',
    'Luis Miguel',
    'Ricardo',
    'Joaquin',
  ];

  const ordersInitial = [
    {
      productName: '',
      amount: '',
      total: '',
    },
  ];

  const [orderValues, setOrderValues] = useState(orderInitialValues);
  const [orders, setOrders] = useState(numberOfOrders());

  const [productNameSuggestions, setProductNameSuggestions] = useState([]);
  const [clientNameSuggestions, setClientNameSuggestions] = useState([]);

  const [productValues, setProductValues] = useState(productInitialValues);
  const [customerValues, setCustomerValues] = useState(customerInitialValues);

  function numberOfOrders() {
    let array = [];
    let i = productForms;
    while (i > 0) {
      array.push({
        productName: '',
        amount: '',
        total: '',
      });
      i--;
    }

    return array;
  }

  const onOrderChange = (e) => {
    setOrderValues({
      ...orderValues,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'productName') {
      setProductNameSuggestions(() =>
        orderProductNameSuggestion(e.target.value, productNameSuggestionsValues)
      );
    }

    if (e.target.name === 'clientName') {
      setClientNameSuggestions(() =>
        orderClientNameSuggestion(e.target.value, clientNameSuggestionsValues)
      );
    }
  };

  const onOrderProductChange = (i) => (e) => {
    let list = [...orders];

    list[i][e.target.name] = e.target.value;
    setOrders(list);

    console.log(orders);

    // orders.map((values, index) => {
    //   if (index === i) {
    //     let newValue = { ...values, [e.target.name]: e.target.value };
    //     setOrders([...orders, (orders[i] = newValue)]);
    //   }
    //   console.log(values)
    // });
  };

  const onProductChange = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value,
    });
  };

  const onCustomerChange = (e) => {
    setCustomerValues({
      ...customerValues,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = () => {};

  const onOrderSubmit = (e) => {
    e.preventDefault();
    setOrderValues({
      ...orderValues,
      orders,
    });
    console.log(orderValues);
  };

  const onProductSubmit = (e) => {
    e.preventDefault();
    console.log(productValues);
  };

  const onCustomerSubmit = (e) => {
    e.preventDefault();
    console.log(customerValues);
  };

  const onOrderProductNameSuggestionSelected = (value) => {
    setOrderValues({
      ...orderValues,
      productName: value,
    });
    setProductNameSuggestions([]);
  };

  const onOrderClientNameSuggestionSelected = (value) => {
    setOrderValues({
      ...orderValues,
      clientName: value,
    });
    setClientNameSuggestions([]);
  };

  // console.log(orderValues);

  return (
    <section className="add-container">
      <div className="add-header"></div>
      <div className="add-tabs">
        <button
          onClick={() => setActiveTab('order')}
          className={activeTab === 'order' ? 'active' : ''}
        >
          Order
        </button>
        <button
          onClick={() => setActiveTab('product')}
          className={activeTab === 'product' ? 'active' : ''}
        >
          Product
        </button>
        <button
          onClick={() => setActiveTab('customer')}
          className={activeTab === 'customer' ? 'active' : ''}
        >
          Customer
        </button>
      </div>
      <div className="add-body">
        {activeTab === 'order' && (
          <form onSubmit={onOrderSubmit}>
            <div>
              <input
                type="text"
                placeholder="Client Name"
                value={orderValues.clientName}
                name="clientName"
                onChange={onOrderChange}
              />
              <div className="suggest-list">
                {clientNameSuggestions.length > 0 && (
                  <ul>
                    {clientNameSuggestions.map((value, i) => {
                      return (
                        <li
                          onClick={() =>
                            onOrderClientNameSuggestionSelected(value)
                          }
                          key={i}
                        >
                          {value}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
            <ul className="product-list">
              {orders.map((prod, i) => {
                return (
                  <li key={i}>
                    <div>
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={prod.productName}
                        name="productName"
                        onChange={onOrderProductChange(i)}
                      />
                      <div className="suggest-list">
                        {productNameSuggestions.length > 0 && (
                          <ul>
                            {productNameSuggestions.map((value, i) => {
                              return (
                                <li
                                  onClick={() =>
                                    onOrderProductNameSuggestionSelected(value)
                                  }
                                  key={i}
                                >
                                  {value}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className="child-input-container">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={prod.amount}
                        name="amount"
                        onChange={onOrderProductChange(i)}
                      />
                      <input
                        type="number"
                        placeholder="Total"
                        value={prod.total}
                        name="total"
                        onChange={onOrderProductChange(i)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <input
              type="date"
              placeholder="Date"
              value={orderValues.date}
              name="date"
              onChange={onOrderChange}
            />
            <div className="add-button-container">
              {/* <button onClick={addProduct}>Add Product</button> */}
              <button type="submit">Add Order</button>
              <button>Cancel</button>
            </div>
          </form>
        )}

        {activeTab === 'product' && (
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
        )}

        {activeTab === 'customer' && (
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
        )}
      </div>
    </section>
  );
};

export default AddNew;
