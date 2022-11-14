import Banner from '../img/hero/banner.jpg';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCategory} from '../redux/actions';
import {selectCategorySelector} from '../redux/selector';
import {Link} from "react-router-dom";

function Menu() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategorySelector);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return(
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all">
                <i className="fa fa-bars" />
                <span>All departments</span>
              </div>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link to={`category/${category.id}`}>
                      <a href="#">{category.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form action="#">
                  <div className="hero__search__categories">
                    All Categories
                    <span className="arrow_carrot-down" />
                  </div>
                  <input type="text" placeholder="What do yo u need?" />
                  <button type="submit" className="site-btn">
                    SEARCH
                  </button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="hero__search__phone__text">
                  <h5>+65 11.188.888</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>
            <div className="hero__item set-bg" style={{backgroundImage: `url(${Banner})`}}>
              <div className="hero__text">
                <span>FRUIT FRESH</span>
                <h2>
                  Vegetable <br />
                  100% Organic
                </h2>
                <p>Free Pickup and Delivery Available</p>
                <a href="#" className="primary-btn">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
