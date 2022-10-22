import './Overview.css';
import React, { useState } from 'react';
import LineChard from '../components/Sidebar/Chard';

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

  const [sales, setSales] = useState({
    labels: data.map((m) => m.month),
    datasets: [
      {
        label: 'Sales',
        data: data.map((s) => s.sales),
        backgroundColor: ['white'],
        color: 'white',
        fill: false,
        borderColor: 'white',
        tension: 0.1,
        // borderDash: [10],
        // borderDashOffset: 1,
        borderJoinStyle: 'miter',
        hoverBackgroundColor: 'red',
        showLine: true,
      },
    ],
  });

  return (
    <section className="overview-container">
      <div className="overview-header">
        <h1>Overview</h1>
      </div>
      <div className="overview-body">
        <div className="body-header">
          <div className="header-information">
            <p>Total Sales</p>
            <h2>$87,000.00</h2>
            <div>
              <p>+14.2%</p>
              <p>+22,870.00 this year</p>
            </div>
          </div>

          <div className="header-information">
            <p>Customers</p>
            <h2>18,6783</h2>
            <div>
              <p>+6.2%</p>
              <p>+1,765 this year</p>
            </div>
          </div>

          <div className="header-information">
            <p>Orders</p>
            <h2>6,785</h2>
            <div>
              <p>+15.2%</p>
              <p>+825 this year</p>
            </div>
          </div>
        </div>

        <div className="body-content">
          <LineChard className="chard" chartData={sales} />
        </div>
      </div>
    </section>
  );
};

export default Overview;
