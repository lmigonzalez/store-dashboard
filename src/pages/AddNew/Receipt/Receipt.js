import './Receipt.css';
import React, { useState, useEffect } from 'react';

const Receipt = ({ receipt }) => {

  const subTotal = () => {
    let sTotal = 0.00;
    receipt.orders.map((ord) => {
      sTotal = sTotal + ord.amount * ord.price;
    });
	let total = (Math.round(sTotal * 100) / 100)
    return parseFloat(total) ;
  };

  const tax = () => {
    return ((subTotal() * 7) / 100).toFixed(2);
  };

  const total = () => {
    return (parseFloat(subTotal() + parseFloat(tax()))).toFixed(2);
  };

  useEffect(() => {
    total();
  }, []);

  return (
    <div className="receipt-content">
      <p className="title">Receipt</p>
      <div className="receipt-header">
        <div>
          <h2>{receipt.storeName}</h2>
          <p>{receipt.storePhone}</p>
          <p>{receipt.storeUrl}</p>
          <p>{receipt.storeAddress}</p>
        </div>
        <div>
          <h2>Invoice To:</h2>
          <p>Invoice NO: 2134</p>
          <p>{receipt.date}</p>
          <p>{receipt.customerName}</p>
          <p>{receipt.customerPhone}</p>
        </div>
      </div>
      <hr></hr>
      <div className="receipt-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {receipt.orders.map((product, index) => {
              return (
                <tr key={index}>
                  <th>{product.name}</th>
                  <th>{product.amount}</th>
                  <th>${product.price}</th>
                  <th>${(parseFloat(product.amount) * parseFloat(product.price)).toFixed(2)}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="receipt-total">
        <div className="total-container">
          <div>
            <p>Sub-Total</p>
            <p>Tax</p>
            <p>Total</p>
          </div>
          <div className='total-values'>
            <p>${subTotal()}</p>
            <p>${tax()}</p>
            <p>${total()}</p>
          </div>
        </div>
      </div>
{/* 
      <div className="receipt-footer">
        <h2>THANK YOU</h2>
        <p>Lucas Fashion</p>
        <p>786-885-7844</p>
      </div> */}
    </div>
  );
};

export default Receipt;
