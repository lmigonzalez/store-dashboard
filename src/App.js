import './App.css';
import React, {useEffect} from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Customers from './pages/Customers/Customers';
import AddNew from './pages/AddNew/AddNew';
import Overview from './pages/Overview/Overview';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';

import ProductDetails from './pages/Products/ProductDetails';
import CustomerDetails from './pages/Customers/CustomerDetails';
import OrderDetails from './pages/Orders/OrderDetails'

import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() =>{
    console.log(location.pathname)
    if(location.pathname === '/'){
      navigate('/new')
    }
  }, [])
  return (
    <main>
      <Sidebar/>
      <section className="content-section">
        <Routes>
          <Route path="/new" element={<AddNew />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />}/>
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
        <Footer/>
      </section>
    </main>
  );
}

export default App;
