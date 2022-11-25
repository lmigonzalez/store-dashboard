import sidebarStyles from './Sidebar.module.css';
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
    <div className={sidebarStyles.sidebar_container}>
      <div className={sidebarStyles.sidebar}>
        <div className={sidebarStyles.sidebar_title}>
          <h1>Storename</h1>
        </div>
        <div className={sidebarStyles.links_container}>
          <div className={sidebarStyles.links}>
            <NavLink to="/new" className={({isActive}) => isActive ? sidebarStyles.active : ''}>
              <AiOutlinePlusCircle /> Add New
            </NavLink>
            <NavLink to="/overview" className={({isActive}) => isActive ? sidebarStyles.active : ''}>
              <AiOutlineBarChart /> Overview
            </NavLink>
            <NavLink to="/products" className={({isActive}) => isActive ? sidebarStyles.active : ''}>
              <AiOutlineShoppingCart /> Products
            </NavLink>
            <NavLink to="/customers" className={({isActive}) => isActive ? sidebarStyles.active : ''}>
              <AiOutlineTeam /> Customers
            </NavLink>
            <NavLink to="/orders" className={({isActive}) => isActive ? sidebarStyles.active : ''}>
              <AiOutlineShopping /> Orders
            </NavLink>
          </div>
        </div>
        <div className={sidebarStyles.settings_container}>
          <div className={sidebarStyles.settings}>
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
