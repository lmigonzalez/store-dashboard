import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../features/orders/ordersSlice';
import orderDetailsStyles from './OrderDetails.module.css'
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";

function OrderDetails({closeOrderDetails, orderSelectedData, bottom}) {
 const dispatch = useDispatch()
 const closeOrderDetailsTab = () =>{
  closeOrderDetails()
  // setOrderDetails(false)
 }

 const onOrderDelete = () =>{
  let id = orderSelectedData.data._id
  dispatch(deleteOrder(id))
  closeOrderDetails()

}

const getTotal = (amount, price) =>{
  let subTotal = amount * price
  let tax = (7 * parseInt(subTotal)) / 100
  let total = (tax + subTotal).toFixed(2)
  return total
}

 
  return(
    <div className={orderDetailsStyles.content} style={{top: bottom}}>
      <div className={orderDetailsStyles.header}>
      <div className={orderDetailsStyles.close_btn}>
        <AiFillCloseCircle onClick={closeOrderDetailsTab}/>
      </div>
          <p>Order#: {orderSelectedData.data._id}</p>
          <p>Client Name: {orderSelectedData.data.clientName}</p>
          <p>Date: {orderSelectedData.data.date}</p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderSelectedData.data.orders.map((product, index) =>{
              return(
                <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.amount}</td>
                <td>${getTotal(product.amount, product.price)}</td>
              </tr>
              )

            })}

          </tbody>
        </table>
      </div>

      <div className={orderDetailsStyles.delete_btn}>
        <AiFillDelete onClick={onOrderDelete}/>
      </div>
    </div>
  )

}

export default OrderDetails;
