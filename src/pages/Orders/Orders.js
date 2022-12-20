import React, { useState, useEffect, useRef } from 'react';
import orderStyles from './Orders.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchOrders,
  selectAllOrders,
  getOrdersStatus,
  getOrdersError,
} from '../../features/orders/ordersSlice';

import { findByName } from '../../utils/productsUtils';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import OrderDetails from './OrderDetails';

const Orders = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector(selectAllOrders);
  const ordersStatus = useSelector(getOrdersStatus);
  // const error = useSelector(getOrdersError);

  const rowRef = useRef([]);
  const [position, setPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('client');

  const [keyword, setKeyWord] = useState('');

  const [searching, setSearching] = useState(false);

  const [orderDetails, setOrderDetails] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState({});
  const [rowSelected, setRowSelected] = useState(-1);

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

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    ifSearching();
  }, [searching, dataLength]);

  useEffect(() => {
    // findByName(productsData, keyword, selectedCategory);
    checkIfSearching();
  }, [keyword]);

  useEffect(() => {
    if (ordersStatus === 'idle' || ordersStatus === 'loading') {
      dispatch(fetchOrders(fetchOrders()));
    }
    setPageCount(Math.ceil(tableData.data.length / usersPerPage))
  }, [ordersStatus, dispatch]);

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
    setRowSelected(index);
    setPosition(rowRef.current[index].getBoundingClientRect());
    if (rowSelected === index) {
      setRowSelected(-1);
    }
  };

  const closeOrderDetails = () => {
    setOrderDetails(false);
    setRowSelected(-1);
  };

  const productSold = () => {
    let total = 0;
    let valueArray = [];
    tableData.data.map((order) => {
      let totalAmount = 0;
      order.orders.map((v) => {
        totalAmount = totalAmount + v.amount;
      });
      valueArray.push(totalAmount);
    });
    valueArray.map((i) => {
      total = total + i;
    });

    return total;
  };

  const salesGrowth = () => {
    let total = 0;
    let valueArray = [];
    tableData.data.map((order) => {
      order.orders.map((t) => {
        let total = 0;
        total = total + t.amount * t.price;
        valueArray.push(total);
      });
    });
    valueArray.map((v) => {
      total = total + v;
    });

    return total.toFixed(2);
  };

  const getTotalProducts = (obj) => {
    return obj.orders.length;
  };

  const getTotalOrderValue = (obj) => {
    let total = 0;
    obj.orders.map((order) => {
      total = total + order.amount * order.price;
    });
    let tax = (7 * parseInt(total)) / 100
    return parseInt(total.toFixed(2)) + tax;
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
              <td>{tableData.data.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>{productSold().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td>${salesGrowth().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
            <OrderDetails
              closeOrderDetails={closeOrderDetails}
              orderSelectedData={orderSelectedData}
              bottom={position.top}
            />
          )}
          {tableData.data.length && (
            <>
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
                        <tr
                          className={
                            rowSelected === index
                              ? orderStyles.row_selected
                              : ''
                          }
                          ref={(el) => (rowRef.current[index] = el)}
                          key={index}
                          onClick={() => showOrderDetails(data, index)}
                        >
                          <td>{data.clientName}</td>
                          <td>{getTotalProducts(data)}</td>
                          <td>${getTotalOrderValue(data).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td>{data.date}</td>
                          <td>{data._id}</td>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
