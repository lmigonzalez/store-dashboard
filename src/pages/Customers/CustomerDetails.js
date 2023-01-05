import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import customerDetailsStyles from './CustomerDetails.module.css';
import LineChard from '../../components/Chard/Chard';
import { getStartDate } from '../../utils/getStartDate';

import { useSelector, useDispatch } from 'react-redux';

import { getCustomersStatus } from '../../features/customers/customersSlice';

import {
  AiOutlineDelete,
  AiOutlineForm,
  AiOutlineUser,
  AiOutlinePhone,
} from 'react-icons/ai';

import Edit from '../../components/Edit/Edit';
import Delete from '../../components/Delete/Delete';
import BackBtn from '../../components/BackBtn/BackBtn';

function CustomerDetails() {
  const dispatch = useDispatch();
  const customersStatus = useSelector(getCustomersStatus);

  const [tab, setTab] = useState(1);
  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);

  const [customerInformation, setCustomerInformation] = useState({});
  // const [date, setDate] = useState('');
  const [customerSince, setCustomerSince] = useState('');
  const [selectedDays, setSelectedDays] = useState(7);
  const [customerData, setCustomerData] = useState({});

  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    setStartDate(getStartDate(7));
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('subjectName'));
    setCustomerInformation(data);

    getMonthsDifference(data.date);
  }, [customersStatus, dispatch]);

  useEffect(() => {
    getCustomerSpentInformation();
  }, [selectedDays]);

  function getCustomerSpentInformation() {
    let clientId = JSON.parse(localStorage.getItem('subjectName'));
    axios
      .post('http://localhost:3032/api/get-customer-information', {
        clientId: clientId._id,
        selectedDays: selectedDays,
      })
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getMonthsDifference(date) {
    let fullDate = '';
    let yearString = '';
    let years = 0;
    let months = 0;
    let newDate = moment(date).format('MMM DD yyyy');
    let todaysDate = moment().format('MMM DD yyyy');
    let difference = moment(todaysDate).diff(moment(newDate), 'months', true);
    if (Math.floor(difference.toFixed() / 12) >= 0) {
      years = Math.floor(difference.toFixed() / 12);
      yearString = `${years} ${years > 0 ? 'years' : 'year'}`;
    }
    if (Math.floor(difference.toFixed() % 12) >= 0) {
      months = Math.floor(difference.toFixed() % 12);
      if (years > 0) {
        fullDate = `${yearString} and ${months} ${
          months > 0 ? 'months' : 'months'
        }`;
      } else {
        fullDate = `${months} ${months > 0 ? 'months' : 'months'}`;
      }
    }

    setCustomerSince(fullDate);
  }

  function customerGraphData() {
    if (customerData.customerSpent) {
      let graphicData = {
        labels: customerData.customerSpent.map((o) => o.date),
        datasets: [
          {
            label: 'Product',
            data: customerData.customerSpent.map((o) => o.total),
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

  function customerUnitsGraphData() {
    if (customerData.unitsSoldResult) {
      let graphicData = {
        labels: customerData.unitsSoldResult.map((o) => o.date),
        datasets: [
          {
            label: 'Product',
            data: customerData.unitsSoldResult.map((o) => o.total),
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

  const getCustomerResume = () => {
    if (
      parseFloat(customerData.totalSpent) >=
      parseFloat(customerData.totalLastSpent)
    ) {
      let isNumNegative = false;

      let totalDifference =
        customerData.totalSpent - customerData.totalLastSpent;

      let percentage;
      if (customerData.totalLastSpent > 0) {
        percentage = Math.abs(
          ((parseInt(customerData.totalSpent) -
            parseInt(customerData.totalLastSpent)) /
            parseInt(customerData.totalLastSpent)) *
            100
        );
      } else {
        percentage = customerData.totalSpent;
      }

      console.log(percentage);
      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference).toFixed(2),
        percentage: parseFloat(percentage).toFixed(2),
      };
    } else if (
      parseFloat(customerData.totalSpent) <
      parseFloat(customerData.totalLastSpent)
    ) {
      let isNumNegative = true;

      let totalDifference =
        customerData.totalSpent - customerData.totalLastSpent;

      let percentage = Math.abs(
        ((parseInt(customerData.totalSpent) -
          parseInt(customerData.totalLastSpent)) /
          parseInt(customerData.totalLastSpent)) *
          100
      );
      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference).toFixed(2),
        percentage: percentage.toFixed(2),
      };
    }
  };

  const getCustomerUnitsResume = () => {
    if (
      parseFloat(customerData.totalOrders) >=
      parseFloat(customerData.lastTotalOrders)
    ) {
      let isNumNegative = false;

      let totalDifference =
        customerData.totalOrders - customerData.lastTotalOrders;

      let percentage;
      if (customerData.lastTotalOrders > 0) {
        percentage = Math.abs(
          ((parseInt(customerData.totalOrders) -
            parseInt(customerData.lastTotalOrders)) /
            parseInt(customerData.lastTotalOrders)) *
            100
        );
      } else {
        percentage = customerData.totalOrders;
      }

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference),
        percentage: parseFloat(percentage).toFixed(2),
      };
    } else if (
      parseFloat(customerData.totalOrders) <
      parseFloat(customerData.lastTotalOrders)
    ) {
      let isNumNegative = true;

      let totalDifference =
        customerData.totalOrders - customerData.lastTotalOrders;

      let percentage = Math.abs(
        ((parseInt(customerData.totalOrders) -
          parseInt(customerData.lastTotalOrders)) /
          parseInt(customerData.lastTotalOrders)) *
          100
      );
      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference),
        percentage: percentage.toFixed(2),
      };
    }
  };

  const switchTab = (tabName) => {
    setTab(tabName);
  };

  const onDelete = () => {
    setDeleteCustomer(!deleteCustomer);
    setEditCustomer(false);
  };

  const onEdit = () => {
    setEditCustomer(!editCustomer);
    setDeleteCustomer(false);
  };

  const onCancel = () => {
    setDeleteCustomer(false);
    setEditCustomer(false);
  };

  const getSelectedDate = (e) => {
    let date = parseInt(e.target.value);
    setStartDate(getStartDate(date));
    setSelectedDays(date);
  };

  let customer = customerGraphData();
  let customerUnitsSold = customerUnitsGraphData();

  let customerResume = getCustomerResume();
  let customerUnitsResume = getCustomerUnitsResume();

  return (
    <section className={customerDetailsStyles.graph_container}>
      {editCustomer && <Edit onCancel={onCancel} component={'customer'} />}

      {deleteCustomer && (
        <Delete
          category={'customer'}
          item={customerInformation.name}
          id={customerInformation._id}
          onCancel={onCancel}
        />
      )}

      <div className={customerDetailsStyles.graph_header}>
        <BackBtn />
        <div className={customerDetailsStyles.header_details}>
          <div className={customerDetailsStyles.customerInf}>
            <div>
              <AiOutlineUser /> {customerInformation.name}
            </div>
            <div style={{ cursor: 'pointer' }}>
              <CopyToClipboard text={customerInformation.phone}>
                <span>
                  <AiOutlinePhone /> {customerInformation.phone}
                </span>
              </CopyToClipboard>
            </div>
          </div>
          <div className={customerDetailsStyles.date}>
            {`FROM: ${startDate} - TO: ${moment().format('MMM DD YYYY')}`}
          </div>
        </div>
      </div>
      <div className={customerDetailsStyles.graph_body}>
        <div className={customerDetailsStyles.search_container}>
          <div className={customerDetailsStyles.customers_options}>
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

        <div className={customerDetailsStyles.body_header}>
          <div
            className={
              tab === 1
                ? `${customerDetailsStyles.header_information} ${customerDetailsStyles.selected}`
                : customerDetailsStyles.header_information
            }
            onClick={() => switchTab(1)}
          >
            <p>Total Spent</p>
            <h2>${parseFloat(customerData.totalSpent).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h2>
            <div>
              {customerResume && (
                <>
                  <p>
                    {customerResume.isNumNegative ? '-' : '+'}
                    {customerResume.percentage
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    %
                  </p>
                  <p>
                    {customerResume.isNumNegative ? '-' : '+'}$
                    {customerResume.totalDifference
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
                ? `${customerDetailsStyles.header_information} ${customerDetailsStyles.selected}`
                : customerDetailsStyles.header_information
            }
            onClick={() => switchTab(2)}
          >
            <p>Sold Orders</p>
            <h2>{customerData.totalOrders}</h2>
            <div>
              {customerUnitsResume && (
                <>
                  {' '}
                  <p>
                    {customerUnitsResume.isNumNegative ? '-' : '+'}
                    {customerUnitsResume.percentage}%
                  </p>
                  <p>
                    {customerUnitsResume.isNumNegative ? '-' : '+'}
                    {customerUnitsResume.totalDifference}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className={customerDetailsStyles.header_information}>
            <p>Customer Since</p>
            <h2>{moment(customerInformation.date).format('MMM DD YYYY')}</h2>
            <div>
              <p>{customerSince}</p>
            </div>
          </div>
        </div>

        <div className={customerDetailsStyles.body_content}>
          {customer.labels && (
            <>
              {' '}
              {tab === 1 && (
                <LineChard className="chard" chartData={customer} />
              )}
              {tab === 2 && (
                <LineChard className="chard" chartData={customerUnitsSold} />
              )}
              {/* {tab === 3 && <LineChard className="chard" chartData={sales} />} */}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default CustomerDetails;
