import './Orders.css';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import { findByName } from '../../utils/productsUtils';

import Table from '../../components/Table/Table';




const Orders = () => {

  const [selectedCategory, setSelectedCategory] = useState('product');

  const [keyword, setKeyWord] = useState('');

  const [searching, setSearching] = useState(false);

  const ordersData = useSelector((state) => state.orders);

  const tableData = {
    header: ['Product', 'Client', 'Amount', 'Total', 'Date', 'Order'],
    data:
      keyword === ''
        ? ordersData
        : findByName(ordersData, keyword, selectedCategory),
  };

  useEffect(() => {
    // findByName(productsData, keyword, selectedCategory);
    checkIfSearching();
  }, [keyword]);

  const onSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onKeyWord = (e) => {
    setKeyWord(e.target.value.toLowerCase());
  };

  const checkIfSearching = () => {
    if (keyword.length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }

  };



  return (
    <section className="customers-container">
      <div className="customers-header"></div>
      <div className="search-container">
        <div className="search-bar">
          <select name="search" onChange={onSelectCategory}>
            <option value="product">product</option>
            <option value="client">client</option>
            <option value="amount">amount</option>
            <option value="total">total</option>
            <option value="date">date</option>
            <option value="order">order</option>
          </select>
          <input
            value={keyword}
            type="text"
            name="searchKey"
            placeholder="Enter Keywords"
            onChange={onKeyWord}
          />
        </div>
      </div>
      <div className="customers-body">
        <div className="customers-table">
          <Table data={tableData} searching={searching} component={'orders'}/>
        </div>
      </div>
    </section>
  );
};

export default Orders;
