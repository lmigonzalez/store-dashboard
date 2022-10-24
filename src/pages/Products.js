import './Products.css';
import React from 'react';

import { Outlet } from 'react-router-dom';

import Table from '../components/Table';

const Products = () => {

  const tableData = {
    header: ['Name', 'Quantity', 'Price', 'Category'],
    data: [
      {
        id: 1,
        name: 'product 1',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 2,
        name: 'product 2',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 3,
        name: 'product 3',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 4,
        name: 'product 4',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 5,
        name: 'product 5',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 6,
        name: 'product 6',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 7,
        name: 'product 7',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 8,
        name: 'product 8',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 9,
        name: 'product 9',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 10,
        name: 'product 10',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 11,
        name: 'product 11',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 12,
        name: 'product 12',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 13,
        name: 'product 13',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 14,
        name: 'product 14',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 15,
        name: 'product 15',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 16,
        name: 'product 16',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 17,
        name: 'product 17',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 18,
        name: 'product 18',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 19,
        name: 'product 19',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      },
      {
        id: 20,
        name: 'product 20',
        quantity: 10,
        price: 9.99,
        category: 'product category',
      }
	  
    ],
  };



  return (
    <section className="products-container">
      <div className="products-header">
        <h1>Products</h1>
      </div>
      <div className="products-body">
        <div className="products-table">
          <Table data={tableData}/>
        </div>
      </div>
    </section>
  );
};

export default Products;
