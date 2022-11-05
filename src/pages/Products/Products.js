import './Products.css';
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Table from '../../components/Table/Table';

import { findByName } from '../../utils/productsUtils';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('name');

  const [keyword, setKeyWord] = useState('');

  const [searching, setSearching] = useState(false);

  const productsData = useSelector((state) => state.products);

  const tableData = {
    header: ['Name', 'Quantity', 'Price', 'Category'],
    data:
      keyword === ''
        ? productsData
        : findByName(productsData, keyword, selectedCategory),
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
    <section className="products-container">
      <div className="products-header"></div>
      <div className="search-container">
        <div className="search-bar">
          <select name="search" onChange={onSelectCategory}>
            <option value="name">name</option>
            <option value="quantity">quantity</option>
            <option value="price">price</option>
            <option value="category">category</option>
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
      <div className="products-body">
        <div className="products-table">
          <Table data={tableData} searching={searching} component={'products'}/>
        </div>
      </div>
    </section>
  );
};

export default Products;
