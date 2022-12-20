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

  // const [sales, setSales] = useState([]);

  useEffect(() => {
    setStartDate(getStartDate(7));
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     setSalesData(await getSales(selectedDays));
  //   };
  //   getData();
  // }, [selectedDays]);

  useEffect(() => {
    getSalesData();
  }, [selectedDays]);

  function getSalesData() {
    axios
      .post('http://localhost:3032/api/get-sales', {
        selectedDays,
      })
      .then((res) => {
        setSalesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  function graphData() {
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

  let resume = getTotalSalesResume();

  let sales = graphData();

  return (
    <section className={overviewStyles.graph_container}>
      <div className={overviewStyles.graph_header}>
        <div className={overviewStyles.header}>
          <select id={overviewStyles.select} onChange={getSelectedDate}>
            <option value={7}>Last 7 days</option>
            <option value={28}>Last 28 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last 365 days</option>
            <option value="*">From the beginning</option>
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
              {resume && (
                <>
                  {' '}
                  <p>
                    {resume.isNumNegative ? '-' : '+'}
                    {resume.percentage}%
                  </p>
                  <p>
                    {resume.isNumNegative ? '-' : '+'} $
                    {resume.totalDifference
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
