import React, { useState, useEffect, useRef } from 'react';
import orderStyles from './Orders.module.css';
import { useSelector } from 'react-redux';
import { findByName } from '../../utils/productsUtils';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import OrderDetails from './OrderDetails';

const Orders = () => {
  const rowRef = useRef([]);
  const [position, setPosition] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('client');

  const [keyword, setKeyWord] = useState('');

  const [searching, setSearching] = useState(false);

  const [orderDetails, setOrderDetails] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState({});
  const [rowSelected, setRowSelected] = useState(-1)

  const ordersData = useSelector((state) => state.orders);

  const tableData = {
    data:
      keyword === ''
        ? ordersData
        : findByName(ordersData, keyword, selectedCategory),
  };

  const [pageNumber, setPageNumber] = useState(0);
  let dataLength = tableData.data.length;
  const usersPerPage = 20;
  let pagesVisited = pageNumber * usersPerPage;

  const [pageCount, setPageCount] = useState(
    Math.ceil(tableData.data.length / usersPerPage)
  );

  useEffect(() => {
    ifSearching();
    // console.log(tableData)
  }, [searching, dataLength]);

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

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const ifSearching = () => {
    if (searching) {
      setPageNumber(0);
      setPageCount(Math.ceil(tableData.data.length / usersPerPage));
    }
    if (pageCount < 0) {
      setPageCount(0);
    }
  };

  const checkIfSearching = () => {
    if (keyword.length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }
  };

  const showOrderDetails = (data, index) => {
    setOrderDetails(!orderDetails);
    setOrderSelectedData({ ...orderSelectedData, data });
    setRowSelected(index)
    setPosition(rowRef.current[index].getBoundingClientRect())
    if(rowSelected === index){
      setRowSelected(-1)
    }
    
  };

  const closeOrderDetails = () => {
    setOrderDetails(false);
    setRowSelected(-1)
  };

  return (
    <section className={orderStyles.orders_container}>
      <div className={orderStyles.orders_header}>
      <table>
          <thead>
            <tr>
              <th>Orders</th>
              <th>Products Sold</th>
              <th>Sales Growth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{450}</td>
              <td>{8050}</td>
              <td>${45800}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={orderStyles.search_container}>
        <div className={orderStyles.search_bar}>
          <select name="search" onChange={onSelectCategory}>
            <option value="client">client</option>
            <option value="products">products</option>
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
      <div className={orderStyles.orders_body}>
        <div className={orderStyles.orders_table}>
          {orderDetails && (
            <OrderDetails closeOrderDetails={closeOrderDetails} orderSelectedData ={orderSelectedData} bottom = {position.top}/>
          )}
          <table className={orderStyles.order_table}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Products</th>
                <th>Total</th>
                <th>Date</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {tableData.data
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((data, index) => {
                  return (
                    <tr className={rowSelected === index ? orderStyles.row_selected : ''} ref={el => rowRef.current[index] = el} key={index} onClick={() => showOrderDetails(data, index)}>
                      <td>{data.client}</td>
                      <td>{data.quantity}</td>
                      <td>{data.total}</td>
                      <td>{data.date}</td>
                      <td>{data.order}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className={orderStyles.table_pagination}>
            <ReactPaginate
              previousLabel={<AiOutlineDoubleLeft />}
              nextLabel={<AiOutlineDoubleRight />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={orderStyles.paginationBttns}
              previousLinkClassName={orderStyles.previousBttn}
              nextLinkClassName={orderStyles.nextBttn}
              disabledClassName={orderStyles.paginationDisabled}
              activeClassName={orderStyles.paginationActive}
              forcePage={searching && 0}
            />
          </div>
          {/* <Table data={tableData} searching={searching} component={'orders'}/> */}
        </div>
      </div>
    </section>
  );
};

export default Orders;
