import './Sidebar.css';
import React from 'react';
import { NavLink } from 'react-router-dom';



import {
  AiOutlinePoweroff,
  AiOutlineSetting,
  AiOutlineBarChart,
  AiOutlineShopping,
  AiOutlinePlusCircle,
  AiOutlineTeam,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

const Sidebar = () => {

  return (
    <div className='sidebar-container'>
      <div className="sidebar">
      <div className="sidebar-title">
        <h1>Storename</h1>
      </div>
      <div className="links-container">
        <div className="links">
          <NavLink to="/new">
            <AiOutlinePlusCircle /> Add New
          </NavLink>
          <NavLink to="/overview">
            <AiOutlineBarChart /> Overview
          </NavLink>
          <NavLink to="/products">
            <AiOutlineShoppingCart /> Products
          </NavLink>
          <NavLink to="/customers">
            <AiOutlineTeam /> Customers
          </NavLink>
          <NavLink to="/orders">
            <AiOutlineShopping /> Orders
          </NavLink>
        </div>
      </div>
      <div className="settings-container">
        <div className="settings">
          <NavLink to="/">
            {' '}
            <AiOutlineSetting /> <p>Settings</p> 
          </NavLink>
          <NavLink to="/">
            {' '}
            <AiOutlinePoweroff /> <p>Sign out</p> 
          </NavLink>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Sidebar;
