import React, { useState } from 'react';
import moment from 'moment';

import { orderProductNameSuggestion } from '../../../utils/searchSuggestions';
import { orderClientNameSuggestion } from '../../../utils/searchSuggestions';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const AddOrder = () => {
  const orderInitialValues = {
    clientName: '',
    // orders: numberOfOrders(),
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

  const ordersInitial = {
    productName: '',
    amount: '',
    total: '',
  };

  const [productForms, setProductForms] = useState(1);
  const [orderValues, setOrderValues] = useState(orderInitialValues);
  const [orders, setOrders] = useState([ordersInitial]);

  const [productNameSuggestions, setProductNameSuggestions] = useState([]);
  const [clientNameSuggestions, setClientNameSuggestions] = useState([]);

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

  const addProduct = () => {
    setOrders((orders) => [
      ...orders,
      { productName: '', amount: '', total: '' },
    ]);
  };

  const onOrderSubmit = (e) => {
    e.preventDefault();
    setOrderValues({
      ...orderValues,
      orders,
    });
    console.log(orderValues);
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

  return (
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
                    onClick={() => onOrderClientNameSuggestionSelected(value)}
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
      <div className="add-product-btn">
        {<AiOutlinePlusCircle onClick={addProduct} />}
      </div>
      <div className="add-button-container">
        <button type="submit">Add Order</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default AddOrder;
