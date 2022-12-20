import moment from 'moment';
import axios from 'axios';

export const getStartDate = (days) => {
  let today = moment();
  let startDate = today.subtract(days - 1, 'days');
  return startDate.format('MMM DD YYYY');
};

// export const getSales = async (selectedDays) => {
//   let lastSales = [];
//   let sales = [];

//   try {
//     let res = await axios.post('http://localhost:3032/api/get-sales', {
//       selectedDays,
//     });
//     sales = res.data[0];
//     lastSales = res.data[1];
//   } catch (err) {
//     console.log(err);
//   }

//   let today = moment();
//   let startDate = moment().subtract(selectedDays, 'days').format('YYYY-MM-DD');

//   let tableXIndex = [moment().format('YYYY-MM-DD')];

//   for (let i = 1; i < selectedDays; i++) {
//     let newDate = today.subtract(1, 'days');
//     tableXIndex.push(newDate.format('YYYY-MM-DD'));
//   }

//   sales.map((i) => {
//     i.totalSales = 0;
//     i.orders.map((x) => {
//       i.totalSales = i.totalSales + x.amount * x.price;
//     });
//     i.totalSales.toFixed(2);
//   });

//   lastSales.map((i) => {
//     i.totalSales = 0;
//     i.orders.map((x) => {
//       i.totalSales = i.totalSales + x.amount * x.price;
//     });
//     i.totalSales.toFixed(2);
//   });

//   let result = [];
//   tableXIndex.map((data) => {
//     let total = 0;
//     let obj = {};
//     obj.date = data;

//     sales.map((i) => {
//       if (i.date === data) {
//         total = total + i.totalSales;
//       }
//     });

//     obj.totalSales = total.toFixed(2);
//     result.push(obj);
//   });

//   let totalSales = 0;

//   result.map((i) => {
//     totalSales = totalSales + parseFloat(i.totalSales);
//   });

//   let lastTotalSales = 0;
//   lastSales.map((i) => {
//     lastTotalSales = lastTotalSales + parseFloat(i.totalSales);
//   });


//   return { totalSalesPerMonth: result.reverse(), totalSales: totalSales.toFixed(2), lastTotalSales }
//   ;
// };
