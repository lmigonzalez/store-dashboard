import './AddNew.css';

import React, { useState } from 'react';

import AddOrder from './AddOrder/AddOrder';
import AddProduct from './AddProduct/AddProduct';
import AddCustomer from './AddCustomer/AddCustomer';

const AddNew = () => {
  const [activeTab, setActiveTab] = useState('order');

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
        {activeTab === 'order' && <AddOrder />}
        {activeTab === 'product' && <AddProduct />}
        {activeTab === 'customer' && <AddCustomer />}
      </div>
    </section>
  );
};

export default AddNew;
