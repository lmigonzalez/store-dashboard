import ordersStyles from './Products.module.css';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProducts,
  getProductsStatus,
  getProductsError,
  fetchProducts,
} from '../../features/products/productsSlice';

import { getOrdersStatus } from '../../features/orders/ordersSlice';

import Table from '../../components/Table/Table';

import { findByName } from '../../utils/productsUtils';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('name');

  const [keyword, setKeyWord] = useState('');

  const [searching, setSearching] = useState(false);

  // const productsData = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const productsData = useSelector(selectAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const ordersStatus = useSelector(getOrdersStatus);

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

  useEffect(() => {
    if (productsStatus === 'idle' || productsStatus === 'loading' || ordersStatus === 'loading') {
      dispatch(fetchProducts(fetchProducts()));
    }

  }, [productsStatus, ordersStatus, dispatch]);

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

  const getStock = () =>{
    let totalStock = 0
    productsData.map(product=>{
      totalStock = totalStock + product.quantity
    })
    return totalStock
  }

  const getCategories = () =>{
    
    let arr = []
    
    productsData.map(product =>{
      arr.push(product.category.toLowerCase())
    })
    
    let countCategories = new Set(arr).size

    return countCategories
  }

  // function test(){
  //   let array = []
  //   tableData.data.map(i=>{
  //     let obj = {}
  //     obj.name = i.name
  //     obj.price = i.price
  //     obj.id = i._id
  //     array.push(obj)
  //   })
  //   console.log(array)
  // }


  return (
    <section className={ordersStyles.products_container}>
      <div className={ordersStyles.products_header}>
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Stock</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productsData.length}</td>
              <td>{getStock().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>{getCategories()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={ordersStyles.search_container}>
        <div className={ordersStyles.search_bar}>
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
      <div className={ordersStyles.products_body}>
        <div className={ordersStyles.products_table}>
          {tableData.data.length && (
            <Table
              data={tableData}
              searching={searching}
              component={'products'}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
