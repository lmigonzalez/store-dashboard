import React, {useState, useEffect} from 'react'
import customersStyles from './Customers.module.css'
import { useSelector } from 'react-redux';

import { findByName } from '../../utils/productsUtils';
import Table from '../../components/Table/Table';

const Customers = () => {
  const [selectedCategory, setSelectedCategory] = useState('name');

  const [keyword, setKeyWord] = useState('');

  const [searching, setSearching] = useState(false);

  const customersData = useSelector((state) => state.customers);

  const tableData = {
    header: ['Name', 'Email', 'Phone', 'Address', 'Plan'],
    data:
      keyword === ''
        ? customersData
        : findByName(customersData, keyword, selectedCategory),
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
    <section className={customersStyles.customers_container}>
      <div className={customersStyles.customers_header}>
        <h2>Customers: {560}</h2>
      </div>
      <div className={customersStyles.search_container}>
        <div className={customersStyles.search_bar}>
          <select name="search" onChange={onSelectCategory}>
            <option value="name">name</option>
            <option value="email">email</option>
            <option value="phone">phone</option>
            <option value="address">address</option>
            <option value="plan">plan</option>
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
      <div className={customersStyles.customers_body}>
        <div className={customersStyles.customers_table}>
          <Table data={tableData} searching={searching} component={'customers'}/>
        </div>
      </div>
    </section>
  );
}

export default Customers