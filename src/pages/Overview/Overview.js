import overviewStyles from './Overview.module.css';
import React, { useState, useEffect } from 'react';
import LineChard from '../../components/Chard/Chard';
import moment from 'moment';
import axios from 'axios';
import { getStartDate } from '../../utils/getStartDate';

const Overview = () => {
  const [selectedDays, setSelectedDays] = useState(7);

  const [startDate, setStartDate] = useState('');

  const [salesData, setSalesData] = useState({});

  const [customersData, setCustomersData] = useState({});
  const [ordersData, setOrdersData] = useState({});

  useEffect(() => {
    setStartDate(getStartDate(7));
  }, []);

  useEffect(() => {
    getSalesData();
    getCustomersData();
    getOrdersData();
  }, [selectedDays]);

  function getSalesData() {
    axios
      .post('http://localhost:3032/api/get-sales-resume', {
        selectedDays,
      })
      .then((res) => {
        setSalesData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCustomersData() {
    axios
      .post('http://localhost:3032/api/get-customers-resume', {
        selectedDays,
      })
      .then((res) => {
        setCustomersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getOrdersData() {
    axios
      .post('http://localhost:3032/api/get-orders-resume', { selectedDays })
      .then((res) => {
        setOrdersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [tab, setTab] = useState(1);

  const switchTab = (tabName) => {
    setTab(tabName);
  };

  function salesGraphData() {
    if (salesData.totalSalesPerMonth) {
      let graphicData = {
        labels: salesData.totalSalesPerMonth.map((m) =>
          moment(m.date).format('MMM DD YYYY')
        ),
        datasets: [
          {
            label: 'Sales',
            data: salesData.totalSalesPerMonth.map((s) => s.totalSales),
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

  // const [customers, setCustomers] = useState({});

  function customersGraphData() {
    if (customersData.customers) {
      let graphicData = {
        labels: customersData.customers.map((o) => o.date),
        datasets: [
          {
            label: 'Customers',
            data: customersData.customers.map((o) => o.totalCustomers),
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

  function ordersGraphData() {
    if (ordersData.orders) {
      let graphicData = {
        labels: ordersData.orders.map((o) => o.date),
        datasets: [
          {
            label: 'Orders',
            data: ordersData.orders.map((o) => o.totalOrders),
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

  // const [orders, setOrders] = useState({});

  const getSelectedDate = (e) => {
    let date = parseInt(e.target.value);
    setStartDate(getStartDate(date));
    setSelectedDays(date);
  };

  function getTotalSalesResume() {
    if (
      parseFloat(salesData.totalSales) > parseFloat(salesData.lastTotalSales)
    ) {
      let isNumNegative = false;

      let totalDifference = salesData.totalSales - salesData.lastTotalSales;

      let percentage = Math.abs(
        ((parseInt(salesData.totalSales) - parseInt(salesData.lastTotalSales)) /
          parseInt(salesData.lastTotalSales)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: totalDifference.toFixed(2),
        percentage: percentage.toFixed(2),
      };
    } else if (
      parseFloat(salesData.totalSales) < parseFloat(salesData.lastTotalSales)
    ) {
      let isNumNegative = true;

      let totalDifference = salesData.totalSales - salesData.lastTotalSales;

      let percentage = Math.abs(
        ((parseInt(salesData.totalSales) - parseInt(salesData.lastTotalSales)) /
          parseInt(salesData.lastTotalSales)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference.toFixed(2)),
        percentage: percentage.toFixed(2),
      };
    }
  }

  function getOrdersResume() {
    if (ordersData.totalOrders > ordersData.totalLastOrders) {
      let isNumNegative = false;
      let totalDifference = ordersData.totalOrders - ordersData.totalLastOrders;
      let percentage = Math.abs(
        ((parseInt(ordersData.totalOrders) -
          parseInt(ordersData.totalLastOrders)) /
          parseInt(ordersData.totalLastOrders)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: totalDifference,
        percentage: percentage.toFixed(2),
      };
    } else if (ordersData.totalOrders < ordersData.totalLastOrders) {
      let isNumNegative = true;
      let totalDifference = ordersData.totalOrders - ordersData.totalLastOrders;
      let percentage = Math.abs(
        ((parseInt(ordersData.totalOrders) -
          parseInt(ordersData.totalLastOrders)) /
          parseInt(ordersData.totalLastOrders)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference),
        percentage: percentage.toFixed(2),
      };
    }
  }

  function getCustomerResume() {
    if (customersData.totalCustomers > customersData.totalLastCustomers) {
      let isNumNegative = false;

      let totalDifference =
        customersData.totalCustomers - customersData.totalLastCustomers;

      let percentage = Math.abs(
        ((parseInt(customersData.totalCustomers) -
          parseInt(customersData.totalLastCustomers)) /
          parseInt(customersData.totalLastCustomers)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: totalDifference,
        percentage: percentage.toFixed(2),
      };
    } else if (
      customersData.totalCustomers < customersData.totalLastCustomers
    ) {
      let isNumNegative = true;
      let totalDifference =
        customersData.totalCustomers - customersData.totalLastCustomers;
      let percentage = Math.abs(
        ((parseInt(customersData.totalCustomers) -
          parseInt(customersData.totalLastCustomers)) /
          parseInt(customersData.totalLastCustomers)) *
          100
      );

      return {
        isNumNegative,
        totalDifference: Math.abs(totalDifference),
        percentage: percentage.toFixed(2),
      };
    } else if (
      customersData.totalCustomers === customersData.totalLastCustomers
    ) {
      let isNumNegative = false;
      let totalDifference = 0;
      let percentage = 0;
      return { isNumNegative, totalDifference, percentage };
    }
  }

  let salesResume = getTotalSalesResume();
  let ordersResume = getOrdersResume();
  let customersResume = getCustomerResume();

  let sales = salesGraphData();
  let orders = ordersGraphData();
  let customers = customersGraphData();

  return (
    <section className={overviewStyles.graph_container}>
      <div className={overviewStyles.graph_header}>
        <div className={overviewStyles.header}>
          <select id={overviewStyles.select} onChange={getSelectedDate}>
            <option value={7}>Last 7 days</option>
            <option value={28}>Last 28 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last 365 days</option>
            {/* <option value="*">From the beginning</option> */}
          </select>
          <div>
            {`FROM: ${startDate} - TO: ${moment().format('MMM DD YYYY')}`}
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
            <h2>
              $
              {salesData &&
                parseFloat(salesData.totalSales)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </h2>
            <div>
              {salesResume && (
                <>
                  {' '}
                  <p>
                    {salesResume.isNumNegative ? '-' : '+'}
                    {salesResume.percentage}%
                  </p>
                  <p>
                    {salesResume.isNumNegative ? '-' : '+'} $
                    {salesResume.totalDifference
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                </>
              )}
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
            <h2>{ordersData.totalOrders}</h2>
            <div>
              {ordersResume && (
                <>
                  <p>
                    {ordersResume.isNumNegative ? '-' : '+'}
                    {ordersResume.percentage}%
                  </p>
                  <p>
                    {ordersResume.isNumNegative ? '-' : '+'}
                    {ordersResume.totalDifference}
                  </p>
                </>
              )}
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
            <h2>{customersData.totalCustomers}</h2>
            <div>
              <p>
                {customersResume.isNumNegative ? '-' : '+'}
                {customersResume.percentage}%
              </p>
              <p>
                {customersResume.isNumNegative ? '-' : '+'}
                {customersResume.totalDifference}
              </p>
            </div>
          </div>
        </div>

        <div className={overviewStyles.body_content}>
          {sales.labels && (
            <>
              {' '}
              {tab === 1 && <LineChard className="chard" chartData={sales} />}
              {tab === 2 && (
                <LineChard className="chard" chartData={customers} />
              )}
              {tab === 3 && <LineChard className="chard" chartData={orders} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Overview;
