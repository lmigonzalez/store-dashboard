import './App.css';
import { Route, Routes } from 'react-router-dom';

import Customers from './pages/Customers';
import AddNew from './pages/AddNew';
import Overview from './pages/Overview';
import Product from './pages/Product';
import Orders from './pages/Orders';

import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <main>
      <Sidebar />
      <section className="content-section">
        <Routes>
          <Route path="/new" element={<AddNew />}></Route>
          <Route path="/overview" element={<Overview />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </section>
    </main>
  );
}

export default App;
