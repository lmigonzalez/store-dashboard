import React, { useState, useEffect } from 'react';
import productDetailsStyles from './ProductDetails.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getProductsStatus } from '../../features/products/productsSlice';
import { populateMessage } from '../../features/notification/notification.Slice';

import axios from 'axios';
import moment from 'moment';
import LineChard from '../../components/Chard/Chard';

import { AiOutlineDelete, AiOutlineForm } from 'react-icons/ai';

import Edit from '../../components/Edit/Edit';
import Delete from '../../components/Delete/Delete';
import BackBtn from '../../components/BackBtn/BackBtn';

import { getStartDate } from '../../utils/getStartDate';

const ProductDetails = () => {
  const dispatch = useDispatch();
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

  const [product, setProduct] = useState({});
  const [productData, setProductData] = useState({});
  const [unitsData, setUnitsData] = useState({});
  const [selectedDays, setSelectedDays] = useState(7);
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    setStartDate(getStartDate(7));
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('subjectName'));
    setProduct(data);
  }, [productsStatus, dispatch]);

  useEffect(() => {
    getProductSalesData();
  }, [selectedDays]);

  function getProductSalesData() {
    let productId = JSON.parse(localStorage.getItem('subjectName'));

    axios
      .post('http://localhost:3032/api/get-product-information', {
        productId: productId._id,
        selectedDays: selectedDays,
      })
      .then((res) => {
        setProductData(res.data[0]);
        setUnitsData(res.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function productGraphData() {
    if (productData.products) {
      let graphicData = {
        labels: productData.products.map((o) => o.date),
        datasets: [
          {
            label: 'Product',
            data: productData.products.map((o) => o.total),
            backgroundColor: ['rgba(120, 88, 166, 0.5)'],
            borderColor: '#7858a6',
            // tension: 0.1,
          },
        ],
      };
      return graphicData;
    }
    return 'no data';
  }

  function unitsGraphData() {
    if (unitsData.unitsSold) {
      let graphicData = {
        labels: unitsData.unitsSold.map((o) => o.date),
        datasets: [
          {
            label: 'Product',
            data: unitsData.unitsSold.map((o) => o.total),
            backgroundColor: ['rgba(120, 88, 166, 0.5)'],
            borderColor: '#7858a6',
            // tension: 0.1,
          },
        ],
      };
      return graphicData;
    }
    return 'no data';
  }

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
    setSelectedDays(date);
  };

  const getProductSoldResume = () => {
    if (
      parseFloat(productData.totalProductSold) >
      parseFloat(productData.lastTotalProductSold)
    ) {
      let isNumNegative = false;

      let totalDifference =
        productData.totalProductSold - productData.lastTotalProductSold;

      let percentage = Math.abs(
        ((parseInt(productData.totalProductSold) -
          parseInt(productData.lastTotalProductSold)) /
          parseInt(productData.lastTotalProductSold)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference).toFixed(2),
        percentage: percentage.toFixed(2),
      };
    } else if (
      parseFloat(productData.totalProductSold) <
      parseFloat(productData.lastTotalProductSold)
    ) {
      let isNumNegative = true;

      let totalDifference =
        productData.totalProductSold - productData.lastTotalProductSold;

      let percentage = Math.abs(
        ((parseInt(productData.totalProductSold) -
          parseInt(productData.lastTotalProductSold)) /
          parseInt(productData.lastTotalProductSold)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference).toFixed(2),
        percentage: percentage.toFixed(2),
      };
    }
  };

  const getUnitsResume = () => {
    if (
      parseFloat(unitsData.totalUnitsSold) >
      parseFloat(unitsData.lastTotalUnitsSold)
    ) {
      let isNumNegative = false;

      let totalDifference =
        unitsData.totalUnitsSold - unitsData.lastTotalUnitsSold;

      let percentage = Math.abs(
        ((parseInt(unitsData.totalUnitsSold) -
          parseInt(unitsData.lastTotalUnitsSold)) /
          parseInt(unitsData.lastTotalUnitsSold)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference),
        percentage: percentage.toFixed(2),
      };
    } else if (
      parseFloat(unitsData.totalUnitsSold) <
      parseFloat(unitsData.lastTotalUnitsSold)
    ) {
      let isNumNegative = true;

      let totalDifference =
        unitsData.totalUnitsSold - unitsData.lastTotalUnitsSold;

      let percentage = Math.abs(
        ((parseInt(unitsData.totalUnitsSold) -
          parseInt(unitsData.lastTotalUnitsSold)) /
          parseInt(unitsData.lastTotalUnitsSold)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference),
        percentage: percentage.toFixed(2),
      };
    }
  };

  let productResume = getProductSoldResume();
  let unitsResume = getUnitsResume();
  let products = productGraphData();
  const units = unitsGraphData();

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
          <div>{product.name}</div>
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
            <h2>
              $
              {parseFloat(productData.totalProductSold)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </h2>
            <div>
              {productResume && (
                <>
                  <p>
                    {productResume.isNumNegative ? '-' : '+'}
                    {productResume.percentage}%
                  </p>
                  <p>
                    {productResume.isNumNegative ? '-' : '+'}$
                    {productResume.totalDifference
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                </>
              )}
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
            <h2>
              {parseFloat(unitsData.totalUnitsSold)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </h2>
            <div>
              {unitsResume && (
                <>
                  {' '}
                  <p>
                    {unitsResume.isNumNegative ? '-' : '+'}
                    {unitsResume.percentage}%
                  </p>
                  <p>
                    {unitsResume.isNumNegative ? '-' : '+'}
                    {unitsResume.totalDifference}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className={productDetailsStyles.header_information}>
            <p>Units Available</p>
            <h2>{product.quantity}</h2>
            <div>
              <p style={{ color: 'transparent' }}> '' </p>
            </div>
          </div>
        </div>

        <div className={productDetailsStyles.body_content}>
          {products.labels && (
            <>
              {' '}
              {tab === 1 && (
                <LineChard className="chard" chartData={products} />
              )}
              {tab === 2 && <LineChard className="chard" chartData={units} />}
              {tab === 3 && (
                <LineChard className="chard" chartData={products} />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
