import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';

function UserLayout({component: Component}) {
  return (
    <>
      <Header />
      <Menu />
      <div className="main">
        <Component />
      </div>
      <Footer />
    </>
  );
}
export default UserLayout;
