import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { populateMessage } from './features/notification/notification.Slice';
import { messageInformation } from './features/notification/notification.Slice';
import Customers from './pages/Customers/Customers';
import AddNew from './pages/AddNew/AddNew';
import Overview from './pages/Overview/Overview';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import ProductDetails from './pages/Products/ProductDetails';
import CustomerDetails from './pages/Customers/CustomerDetails';
import GlobalNotification from './components/Global-Notification/GlobalNotification';
import PrivateRoutes from './utils/PrivateRoutes';

import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [showSidebar, setShowSidebar] = useState(true);
  const [noSidebar, SetNoSidebar] = useState('');
  // const [showNotification, setShowNotification] = useState(true)
  let showNotification = useSelector(messageInformation)



  useEffect(() => {
    // dispatch(populateMessage({message: 'Welcome Back Luis', messageStatus: true, showNotification: true}))

    if (location.pathname === '/') {
      navigate('/new');
    }

    if (
      location.pathname === '/login' ||
      location.pathname === '/recover-password'
    ) {
      setShowSidebar(false);
      SetNoSidebar('no-sidebar');
    } else if (
      location.pathname !== '/login' ||
      location.pathname !== '/recover-password'
    ) {
      SetNoSidebar('');
      setShowSidebar(true);
    }
  }, [location]);

  useEffect(()=>{
    setTimeout(() => {
      dispatch(populateMessage({message: '', messageStatus: true, showNotification: false}))

		  }, "5000")
  }, [showNotification.message])

  return (
    <main className={noSidebar}>
      {showSidebar && <Sidebar />}
      {/* <Sidebar/> */}
      <section className="content-section">
        {showNotification.showNotification && <GlobalNotification/>}
        
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/new" element={<AddNew />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customer/:id" element={<CustomerDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Routes>
        {/* <Footer /> */}
      </section>
    </main>
  );
}

export default App;
