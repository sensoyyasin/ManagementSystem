// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import '../App.css'; // İsteğe bağlı CSS dosyası

const Layout = () => {
  return (
    <div className="layout-container">
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
