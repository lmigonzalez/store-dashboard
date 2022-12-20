import productDetailsStyles from './ProductDetails.module.css';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {getProductsStatus} from '../../features/products/productsSlice'


import moment from 'moment';
import LineChard from '../../components/Chard/Chard';

import { AiOutlineDelete, AiOutlineForm } from 'react-icons/ai';

import Edit from '../../components/Edit/Edit';
import Delete from '../../components/Delete/Delete';
import BackBtn from '../../components/BackBtn/BackBtn';

import { getStartDate } from '../../utils/getStartDate';

const ProductDetails = () => {

  const dispatch = useDispatch()
  const productsStatus = useSelector(getProductsStatus);

  const [tab, setTab] = useState(1);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const data = [
    {
      id: 1,
      month: 'Jan',
      sales: 1234,
    },
    {
      id: 2,
      month: 'Feb',
      sales: 1454,
    },
    {
      id: 3,
      month: 'Mar',
      sales: 1044,
    },
    {
      id: 4,
      month: 'Apr',
      sales: 1104,
    },
    {
      id: 5,
      month: 'May',
      sales: 1734,
    },
    {
      id: 6,
      month: 'Jun',
      sales: 1587,
    },
  ];
  const [sales, setSales] = useState({
    labels: data.map((m) => m.month),
    datasets: [
      {
        label: 'Sales',
        data: data.map((s) => s.sales),
        backgroundColor: ['white'],
        borderColor: 'white',
        tension: 0.1,
      },
    ],
  });

  const [product, setProduct] = useState({});

  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    setStartDate(getStartDate(7));
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('subjectName'));
    setProduct(data);
  }, [productsStatus, dispatch]);

  const switchTab = (tabName) => {
    setTab(tabName);
  };

  const onDelete = () => {
    setDeleteProduct(!deleteProduct);
    setEditProduct(false);
  };

  const onEdit = () => {
    setEditProduct(!editProduct);
    setDeleteProduct(false);
  };

  const onCancel = () => {
    setDeleteProduct(false);
    setEditProduct(false);
  };

  const getSelectedDate = (e) => {
    let date = parseInt(e.target.value);
    setStartDate(getStartDate(date));
  };

  return (
    <section className={productDetailsStyles.graph_container}>
      {editProduct && <Edit onCancel={onCancel} component={'product'} />}

      {deleteProduct && (
        <Delete
          category={'product'}
          item={product.name}
          id={product._id}
          onCancel={onCancel}
        />
      )}

      <div className={productDetailsStyles.graph_header}>
        <BackBtn />
        <div className={productDetailsStyles.graph_header_inf}>
          <h2>{product.name}</h2>
          <div>
            {`FROM: ${startDate} - TO: ${moment().format('MMM DD YYYY')}`}
          </div>
        </div>
      </div>
      <div className={productDetailsStyles.graph_body}>
        <div className={productDetailsStyles.search_container}>
          <div className={productDetailsStyles.products_options}>
            <select onChange={getSelectedDate}>
              <option value={7}>Last 7 days</option>
              <option value={28}>Last 28 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last 365 days</option>
              <option value="*">From the beginning</option>
            </select>
            <div>
              <AiOutlineForm onClick={onEdit} />
              <AiOutlineDelete onClick={onDelete} />
            </div>
          </div>
        </div>

        <div className={productDetailsStyles.body_header}>
          <div
            className={
              tab === 1
                ? `${productDetailsStyles.header_information} ${productDetailsStyles.selected}`
                : productDetailsStyles.header_information
            }
            onClick={() => switchTab(1)}
          >
            <p>Total Sold</p>
            <h2>$7,000.00</h2>
            <div>
              <p>+14.2%</p>
              <p>+22,870.00 this year</p>
            </div>
          </div>

          <div
            className={
              tab === 2
                ? `${productDetailsStyles.header_information} ${productDetailsStyles.selected}`
                : productDetailsStyles.header_information
            }
            onClick={() => switchTab(2)}
          >
            <p>Sold Units</p>
            <h2>545</h2>
            <div>
              <p>+6.2%</p>
              <p>+1,765 this year</p>
            </div>
          </div>

          <div className={productDetailsStyles.header_information}>
            <p>Units Available</p>
            <h2>{product.quantity}</h2>
            <div>
              <p>+15.2%</p>
              <p>+825 this year</p>
            </div>
          </div>
        </div>

        <div className={productDetailsStyles.body_content}>
          {tab === 1 && <LineChard className="chard" chartData={sales} />}
          {tab === 2 && <LineChard className="chard" chartData={sales} />}
          {/* {tab === 3 && <LineChard className="chard" chartData={sales} />} */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
