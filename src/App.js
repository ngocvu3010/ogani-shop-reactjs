import React, { useState, useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify";
import './css/elegant-icons.css';
import './css/font-awesome.min.css';
import './css/nice-select.css';
import './css/slicknav.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import './scss/style.scss';

import UserLayout from "./components/Layouts/UserLayout";
import AdminLayout from "./components/Layouts/AdminLayout";
import Home from './pages/User/Home';
import ProductDetail from './pages/User/ProductDetail';
import CategoryDetail from './pages/User/CategoryDetail';
import Login from './pages/User/Login';
import CheckoutCart from "./pages/User/CheckoutCart";
import Billing from "./pages/User/Billing";
import AdminProducts from "./pages/Admin/Products"
import CreateProduct from "./pages/Admin/CreateProduct";
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
        <Route exact path="/category/:categoryId">
          <UserLayout component={CategoryDetail} />
        </Route>
        <Route exact path="/carts">
          <UserLayout component={CheckoutCart} />
        </Route>
        <Route exact path="/billing">
          <UserLayout component={Billing} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/admin">
          <AdminLayout component={AdminProducts} />
        </Route>
        <Route exact path="/admin/create_product">
          <AdminLayout component={CreateProduct} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
