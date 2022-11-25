import React, { useState } from 'react';
import addNewStyles from './AddNew.module.css';

import AddOrder from './AddOrder/AddOrder';
import AddProduct from './AddProduct/AddProduct';
import AddCustomer from './AddCustomer/AddCustomer';

const AddNew = () => {
  const [activeTab, setActiveTab] = useState('order');

  return (
    <section className={addNewStyles.add_container}>
      <div className={addNewStyles.add_header}></div>
      <div className={addNewStyles.add_tabs}>
        <button
          onClick={() => setActiveTab('order')}
          className={activeTab === 'order' ? addNewStyles.active : ''}
        >
          Order
        </button>
        <button
          onClick={() => setActiveTab('product')}
          className={activeTab === 'product' ? addNewStyles.active : ''}
        >
          Product
        </button>
        <button
          onClick={() => setActiveTab('customer')}
          className={activeTab === 'customer' ? addNewStyles.active : ''}
        >
          Customer
        </button>
      </div>
      <div className={addNewStyles.add_body}>
        {activeTab === 'order' && <AddOrder />}
        {activeTab === 'product' && <AddProduct />}
        {activeTab === 'customer' && <AddCustomer />}
      </div>
    </section>
  );
};

export default AddNew;
