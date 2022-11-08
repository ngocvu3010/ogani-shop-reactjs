import React, { useState, useEffect } from 'react';
import { Router, Switch } from "react-router-dom";

import './css/elegant-icons.css';
import './css/font-awesome.min.css';
import './css/nice-select.css';
import './css/slicknav.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import './scss/style.scss';

import UserLayout from "./components/Layouts/UserLayout";
import Home from './pages/User/Home';


function App() {
  return (
    <>
      <UserLayout component={Home} />
    </>
  );
}

export default App;
