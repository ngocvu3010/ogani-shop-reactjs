import React, { useState, useEffect } from 'react';
import './css/elegant-icons.css';
import './css/font-awesome.min.css';
import './css/nice-select.css';
import './css/slicknav.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import './scss/style.scss';

import UserLayout from "./components/Layouts/UserLayout";
import Home from './pages/User/Home';
import ProductDetail from './pages/User/ProductDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserLayout component={Home} />
        </Route>
        <Route exact path="/product/:productId">
          <UserLayout component={ProductDetail} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
