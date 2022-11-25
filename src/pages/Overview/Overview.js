import overviewStyles from './Overview.module.css';
import React, { useState } from 'react';
import LineChard from '../../components/Chard/Chard';

const Overview = () => {
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
  const customersData = [
    {
      id: 1,
      month: 'Jan',
      sales: 234,
    },
    {
      id: 2,
      month: 'Feb',
      sales: 154,
    },
    {
      id: 3,
      month: 'Mar',
      sales: 1044,
    },
    {
      id: 4,
      month: 'Apr',
      sales: 4,
    },
    {
      id: 5,
      month: 'May',
      sales: 734,
    },
    {
      id: 6,
      month: 'Jun',
      sales: 587,
    },
  ];

  const ordersData = [
    {
      id: 1,
      month: 'Jan',
      sales: 234,
    },
    {
      id: 2,
      month: 'Feb',
      sales: 11154,
    },
    {
      id: 3,
      month: 'Mar',
      sales: 12044,
    },
    {
      id: 4,
      month: 'Apr',
      sales: 4123,
    },
    {
      id: 5,
      month: 'May',
      sales: 734,
    },
    {
      id: 6,
      month: 'Jun',
      sales: 587,
    },
  ];

  const [tab, setTab] = useState(1);

  const switchTab = (tabName) => {
    setTab(tabName);
  };

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

  const [customers, setCustomers] = useState({
    labels: customersData.map((m) => m.month),
    datasets: [
      {
        label: 'Sales',
        data: customersData.map((s) => s.sales),
        backgroundColor: ['white'],
        borderColor: 'white',
        tension: 0.1,
      },
    ],
  });

  const [orders, setOrders] = useState({
    labels: ordersData.map((m) => m.month),
    datasets: [
      {
        label: 'Sales',
        data: ordersData.map((s) => s.sales),
        backgroundColor: ['white'],
        borderColor: 'white',
        tension: 0.1,
      },
    ],
  });

  return (
    <section className={overviewStyles.graph_container}>
      <div className={overviewStyles.graph_header}>
        <div className={overviewStyles.header}>
          <select id={overviewStyles.select}>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 28 days">Last 28 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="Last 365 days">Last 365 days</option>
            <option value="From the beginning">From the beginning</option>
          </select>
          <div>
            From: Nov 17 2022 - To: Nov 24 2022
          </div>
        </div>
      </div>
      <div className={overviewStyles.graph_body}>
        <div className={overviewStyles.body_header}>
          <div
            className={
              tab === 1
                ? `${overviewStyles.header_information} ${overviewStyles.selected}`
                : overviewStyles.header_information
            }
            onClick={() => switchTab(1)}
          >
            <p>Total Sales</p>
            <h2>$87,000.00</h2>
            <div>
              <p>+14.2%</p>
              <p>+22,870.00 this year</p>
            </div>
          </div>

          <div
            className={
              tab === 2
                ? `${overviewStyles.header_information} ${overviewStyles.selected}`
                : overviewStyles.header_information
            }
            onClick={() => switchTab(2)}
          >
            <p>Customers</p>
            <h2>18,6783</h2>
            <div>
              <p>+6.2%</p>
              <p>+1,765 this year</p>
            </div>
          </div>

          <div
            className={
              tab === 3
                ? `${overviewStyles.header_information} ${overviewStyles.selected}`
                : overviewStyles.header_information
            }
            onClick={() => switchTab(3)}
          >
            <p>Orders</p>
            <h2>6,785</h2>
            <div>
              <p>+15.2%</p>
              <p>+825 this year</p>
            </div>
          </div>
        </div>

        <div className={overviewStyles.body_content}>
          {tab === 1 && <LineChard className="chard" chartData={sales} />}
          {tab === 2 && <LineChard className="chard" chartData={customers} />}
          {tab === 3 && <LineChard className="chard" chartData={orders} />}
        </div>
      </div>
    </section>
  );
};

export default Overview;
