import React, {useEffect, useState} from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectCartSelector} from "../redux/selector";
import {logoutUser, getCart, loginUserSuccess, updateCartSuccess} from  "../redux/actions";
import {getCurrentUserSelector} from "../redux/selector";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const cartDataInfo = useSelector(selectCartSelector);
  const likeProduct = JSON.parse(localStorage.getItem("likeProduct"));
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("account"));
    if (!currentUser && userData) {
      dispatch(loginUserSuccess(userData));
    }

    if (userData) {
      dispatch(getCart({userId: userData.id}))
    }

  }, []);
  const totalPrices = cartDataInfo.cartData.reduce((sum, item) => sum + (item.price * item.amount), 0);

  const handleClickLogin = () => {
    if (currentUser) {
      localStorage.clear();
      dispatch(logoutUser());
      dispatch(updateCartSuccess([]));
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  return(
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>
                    <i className="fa fa-envelope" /> {currentUser?.email}
                  </li>
                  <li>{currentUser?.last} {currentUser?.first}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest-p" />
                  </a>
                </div>
                <div className="header__top__right__language">
                  <img src="img/language.png" alt="" />
                  <div>English</div>
                  <span className="arrow_carrot-down" />
                  <ul>
                    <li>
                      <a href="#">Spanis</a>
                    </li>
                    <li>
                      <a href="#">English</a>
                    </li>
                  </ul>
                </div>
                <div className="header__top__right__auth">
                  <a href="#" onClick={() => handleClickLogin()}>
                    <i className="fa fa-user" /> {currentUser ? "Logout" : "Login"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <a href="./index.html">
                <img src="img/logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul>
                <li className="active">
                  <Link to="/">
                    <a href="#">Home</a>
                  </Link>
                </li>
                <li>
                  <Link to="/carts">
                    <a href="#">Cart</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li>
                  <a href="#">
                    <i className="fa fa-heart" /> <span>{likeProduct?.length || 0}</span>
                  </a>
                </li>
                <li>
                  <Link to="/carts">
                    <a href="#">
                      <i className="fa fa-shopping-bag" /> <span>{cartDataInfo?.cartData?.length}</span>
                    </a>
                  </Link>
                </li>
              </ul>
              <div className="header__cart__price">
                item: <span>${totalPrices}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars" />
        </div>
      </div>
    </header>
  );
}

export default Header;
