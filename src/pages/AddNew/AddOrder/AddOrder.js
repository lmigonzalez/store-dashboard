import './AddOrder.css';

import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';

import { orderProductNameSuggestion } from '../../../utils/searchSuggestions';
import { orderClientNameSuggestion } from '../../../utils/searchSuggestions';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Receipt from '../Receipt/Receipt';

const AddOrder = () => {
  const ref = useRef();
  const [width, setWidth] = useState(850);
  const [height, setHeight] = useState(1100);
  let color = 'white';

  let initialReceiptData = {
    storeName: 'Lucas Fashion',
    storePhone: '305-846-8778',
    storeUrl: 'www.lucasfashion.com',
    storeAddress: '123 SW 2343th ST Miami, Fl 33123',
    invoiceNo: 2134,
    date: moment().format('MMMM Do YYYY'),
    customerName: 'Jessica Smith',
    customerPhone: '786-887-7841',
    storePhone: '305-846-8778',
  };

  useEffect(() => {
    if (showReceipt) {
      setWidth(ref.current.offsetWidth);
      setHeight(width * 1.3);
    }

  }, [width]);

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
    price: '',
  };

  const [receipt, setReceipt] = useState(initialReceiptData);
  const [showReceipt, setShowReceipt] = useState(false)
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
  };

  const addProduct = () => {
    setOrders((orders) => [
      ...orders,
      { productName: '', amount: '', price: '' },
    ]);
  };

  const onOrderSubmit = (e) => {
    e.preventDefault();
    setOrderValues({
      ...orderValues,
      orders,
    });

    setReceipt({
      ...receipt,
      orders,
    });

    setShowReceipt(!showReceipt)
    console.log(showReceipt)
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
    <div>
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
        <ul className= {orders.length > 1 ? "products-list": "product-list" }>
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
                    placeholder="Price"
                    value={prod.price}
                    name="price"
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

      {showReceipt && (
        <div ref={ref} className="receipt">
          <div
            className="receipt-paper"
            style={{
              width: width,
              height: height,
              backgroundColor: color,
              maxWidth: '850px',
            }}
          >
            <Receipt receipt={receipt} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AddOrder;
