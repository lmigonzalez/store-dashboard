import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import customerDetailsStyles from './CustomerDetails.module.css';
import LineChard from '../../components/Chard/Chard';
import { getStartDate } from '../../utils/getStartDate';

import { useSelector, useDispatch } from 'react-redux';

import {
  getCustomersStatus,
} from '../../features/customers/customersSlice';

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

  const [customerInformation, setCustomerInformation] = useState({});
  // const [date, setDate] = useState('');
  const [customerSince, setCustomerSince] = useState('');

  // useSelector(state => state.customers.customers)

  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    setStartDate(getStartDate(7));
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('subjectName'));
    setCustomerInformation(data);

    getMonthsDifference(data.date);
  }, [customersStatus, dispatch]);

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
  };

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
            <div style={{cursor: 'pointer'}}>
              <CopyToClipboard text={customerInformation.phone}>
                <span>
                  <AiOutlinePhone/> {customerInformation.phone}
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
              <option value="*">From the beginning</option>
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
            <h2>$6,500.00</h2>
            <div>
              <p>+14.2%</p>
              <p>$5,070.00 last 365 days</p>
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
            <h2>210</h2>
            <div>
              <p>+6.2%</p>
              <p>+80 last 365 days</p>
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
          {tab === 1 && <LineChard className="chard" chartData={sales} />}
          {tab === 2 && <LineChard className="chard" chartData={sales} />}
          {/* {tab === 3 && <LineChard className="chard" chartData={sales} />} */}
        </div>
      </div>
    </section>
  );
}

export default CustomerDetails;
