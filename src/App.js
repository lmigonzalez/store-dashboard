import './App.css';
import { Route, Routes } from 'react-router-dom';

import Customers from './pages/Customers';
import AddNew from './pages/AddNew';
import Overview from './pages/Overview';
import Products from './pages/Products';
import Orders from './pages/Orders';

import ProductDetails from './pages/ProductDetails';

import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <main>
      <Sidebar />
      <section className="content-section">
        <Routes>
          <Route path="/new" element={<AddNew />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />}/>
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
