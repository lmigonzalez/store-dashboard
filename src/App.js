import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Customers from './pages/Customers/Customers';
import AddNew from './pages/AddNew/AddNew';
import Overview from './pages/Overview/Overview';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';

import ProductDetails from './pages/Products/ProductDetails';
import CustomerDetails from './pages/Customers/CustomerDetails';
import OrderDetails from './pages/Orders/OrderDetails';

import PrivateRoutes from './utils/PrivateRoutes';

import Sidebar from './components/Sidebar/Sidebar';


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(true);
  const [noSidebar, SetNoSidebar] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/new');
    }

    if (location.pathname === '/login') {
      setShowSidebar(false);
      SetNoSidebar('no-sidebar');
    }
    if (location.pathname !== '/login') {
      SetNoSidebar('');
      setShowSidebar(true);
    }
  }, [location]);

  return (
    <main className={noSidebar}>
      {showSidebar && <Sidebar />}
      {/* <Sidebar/> */}
      <section className="content-section">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/new" element={<AddNew />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customer/:id" element={<CustomerDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </section>
    </main>
  );
}

export default App;
