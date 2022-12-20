import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts } from '../../../features/products/productsSlice';
import { selectAllCustomers } from '../../../features/customers/customersSlice';
import { addNewOrder } from '../../../features/orders/ordersSlice';
import addOrderStyles from './AddOrder.module.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { AiOutlineDownload } from 'react-icons/ai';
import { orderProductNameSuggestion } from '../../../utils/searchSuggestions';
import { orderClientNameSuggestion } from '../../../utils/searchSuggestions';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Receipt from '../Receipt/Receipt';

const AddOrder = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [width, setWidth] = useState(850);
  const [height, setHeight] = useState(1100);
  let color = 'white';

  let initialReceiptData = {
    storeName: 'Lucas Fashion',
    storePhone: '305-846-8778',
    storeUrl: 'www.lucasfashion.com',
    storeAddress: '123 SW 2343th ST Miami, Fl 33123',
    invoiceNo: 2134,
    date: moment().format('MMMM Do YYYY'),
    customerName: 'Jessica Smith',
    customerPhone: '786-887-7841',
    storePhone: '305-846-8778',
  };

  useEffect(() => {
    if (showReceipt) {
      setWidth(ref.current.offsetWidth);
      setHeight(width * 1.3);
    }
  }, [width]);

  const orderInitialValues = {
    clientName: '',
    clientId: '',
    date: moment().format('YYYY-MM-DD'),
  };

  const productNameSuggestionsValues = useSelector(selectAllProducts);
  const clientNameSuggestionsValues = useSelector(selectAllCustomers);

  const ordersInitial = {
    name: '',
    quantity: '',
    amount: '',
    price: '',
    id: '',
  };

  const [receipt, setReceipt] = useState(initialReceiptData);
  const [showReceipt, setShowReceipt] = useState(false);
  // const [productForms, setProductForms] = useState(1);
  const [orderValues, setOrderValues] = useState(orderInitialValues);
  const [orders, setOrders] = useState([ordersInitial]);

  const [productNameSuggestions, setProductNameSuggestions] = useState([]);
  const [clientNameSuggestions, setClientNameSuggestions] = useState([]);

  const [selectedInput, setSelectedInput] = useState(-1);

  useEffect(() => {
    if (orderValues.orders) {
      dispatch(addNewOrder(orderValues));
      console.log(orderValues);
    }
  }, [onOrderSubmit]);

  const onOrderChange = (e) => {
    setOrderValues({
      ...orderValues,
      [e.target.name]: e.target.value,
    });

    setClientNameSuggestions(() =>
      orderClientNameSuggestion(e.target.value, clientNameSuggestionsValues)
    );
  };

  const addProduct = () => {
    setOrders((orders) => [
      ...orders,
      { name: '', quantity: '', price: '', id: '', amount: '' },
    ]);
  };

  const onOrderProductChange = (i) => (e) => {
    let list = JSON.parse(JSON.stringify([...orders]));
    list[i][e.target.name] = e.target.value;

    setOrders(list);

    if (e.target.name === 'name') {
      setProductNameSuggestions(() =>
        orderProductNameSuggestion(e.target.value, productNameSuggestionsValues)
      );
    }

    setSelectedInput(i);
  };

  function onOrderSubmit(e) {
    e.preventDefault();

    setOrderValues({
      ...orderValues,
      orders,
    });

    setReceipt({
      ...receipt,
      orders,
    });

    setShowReceipt(!showReceipt);
  }

  const onOrderClientNameSuggestionSelected = (value) => {
    setOrderValues({
      ...orderValues,
      clientName: value.name,
      clientId: value._id,
    });
    setClientNameSuggestions([]);
  };

  const onOrderProductNameSuggestionSelected = (value, i) => {
    let products = [...orders];
    let product = { ...products[i] };
    product = value;
    products[i] = product;

    setOrders(products);
    setProductNameSuggestions([]);
  };
  // pdf

  function createPDF() {
    axios
      .post('http://localhost:3032/pdf', orderValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const printTickets = async () => {
    const { data } = await getTicketsPdf();
    console.log(data);
    const blob = new Blob([data], { type: 'application/pdf' });
    saveAs(blob, 'tickets.pdf');
  };

  const getTicketsPdf = async () => {
    return axios.get('http://localhost:3032/getPdf', {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    });
  };

  const downloadPDF = async () => {
    await createPDF();
    printTickets();
  };

  return (
    <div className={addOrderStyles.add_order_container}>
      <form onSubmit={onOrderSubmit}>
        <div>
          <input
            type="text"
            placeholder="Client Name"
            value={orderValues.clientName}
            name="clientName"
            onChange={onOrderChange}
            autoComplete="off"
          />
          <div className={addOrderStyles.suggest_list}>
            {clientNameSuggestions.length > 0 && (
              <ul>
                {clientNameSuggestions.map((value, i) => {
                  return (
                    <li
                      onClick={() => onOrderClientNameSuggestionSelected(value)}
                      key={i}
                    >
                      {value.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <ul
          className={
            orders.length > 1
              ? addOrderStyles.products_list
              : addOrderStyles.product_list
          }
        >
          {orders.map((prod, index) => {
            return (
              <li key={index}>
                <div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={prod.name}
                    name="name"
                    onChange={onOrderProductChange(index)}
                    autoComplete="off"
                  />
                  {selectedInput === index && (
                    <div className={addOrderStyles.suggest_list}>
                      {productNameSuggestions.length > 0 && (
                        <ul>
                          {productNameSuggestions.map((value, i) => {
                            return (
                              <li
                                onClick={() =>
                                  onOrderProductNameSuggestionSelected(
                                    value,
                                    index
                                  )
                                }
                                key={i}
                              >
                                {value.name}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                <div className={addOrderStyles.child_input_container}>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={prod.amount}
                    name="amount"
                    onChange={onOrderProductChange(index)}
                    onWheel={() => document.activeElement.blur()}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={prod.price}
                    name="price"
                    onChange={onOrderProductChange(index)}
                    onWheel={() => document.activeElement.blur()}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <input
          type="date"
          placeholder="Date"
          value={orderValues.date}
          name="date"
          onChange={onOrderChange}
        />
        <div className={addOrderStyles.add_product_btn}>
          {<AiOutlinePlusCircle onClick={addProduct} />}
        </div>
        <div className={addOrderStyles.add_button_container}>
          <button type="submit">Add Order</button>
          <button>Cancel</button>
        </div>
      </form>

      {showReceipt && (
        <div ref={ref} className={addOrderStyles.receipt}>
          <div
            className={addOrderStyles.receipt_paper}
            style={{
              width: width,
              height: height,
              backgroundColor: color,
              maxWidth: '850px',
            }}
          >
            <div className={addOrderStyles.download_pdf}>
              <button onClick={downloadPDF}>
                {' '}
                <AiOutlineDownload /> Download
              </button>
            </div>
            <Receipt receipt={receipt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
