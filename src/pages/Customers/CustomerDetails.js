import React, { useState } from 'react';

import LineChard from '../../components/Chard/Chard';

import { AiOutlineDelete, AiOutlineForm } from 'react-icons/ai';

import Edit from '../../components/Edit/Edit';
import Delete from '../../components/Delete/Delete';

function CustomerDetails() {
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

  return (
    <section className="graph-container">
      {editCustomer && <Edit onCancel={onCancel} component={'customer'}/>}

      {deleteCustomer && (
        <Delete
          category={'customer'}
          item={'lenovo legion i7'}
          onCancel={onCancel}
        />
      )}

      <div className="graph-header">
        <h1>graph</h1>
      </div>
      <div className="graph-body">
        <div className="search-container">
          <div className="products-options">
            <select>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 28 days">Last 28 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Last 365 days">Last 365 days</option>
              <option value="From the beginning">From the beginning</option>
            </select>
            <div>
              <AiOutlineForm onClick={onEdit} />
              <AiOutlineDelete onClick={onDelete} />
            </div>
          </div>
        </div>

        <div className="body-header">
          <div
            className={
              tab === 1 ? 'header-information selected' : 'header-information'
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
              tab === 2 ? 'header-information selected' : 'header-information'
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

          <div className="header-information">
            <p>Customer Since</p>
            <h2>Jul, 25 2020</h2>
            <div>
              <p>2 years and 10 months</p>
            </div>
          </div>
        </div>

        <div className="body-content">
          {tab === 1 && <LineChard className="chard" chartData={sales} />}
          {tab === 2 && <LineChard className="chard" chartData={sales} />}
          {/* {tab === 3 && <LineChard className="chard" chartData={sales} />} */}
        </div>
      </div>
    </section>
  );
}

export default CustomerDetails;
