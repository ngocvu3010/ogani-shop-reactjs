import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHomeProducts} from '../../redux/actions';
import {selectHomeProductSelector, selectCategorySelector} from "../../redux/selector";
import productImage from '../../img/featured/feature-2.jpg';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const MAX_FEATURE_PRODUCTS = 12;

function FeatureProduct() {
  const dispatch = useDispatch();
  const [selectedFeatureCategory, setSelectedFeatureCategory] = useState("All");

  useEffect(() => {
    let params = selectedFeatureCategory === "All" ? "" : `categoryId=${selectedFeatureCategory}`
    dispatch(getHomeProducts(params));
  }, [selectedFeatureCategory]);

  const products = useSelector(selectHomeProductSelector);
  const categories = useSelector(selectCategorySelector).filter((category) => category.featured);
  const renderProduct = () => {
    return products.slice(0, MAX_FEATURE_PRODUCTS).map((product, index) => {
      const image = product.img && product.img[0]

      return (
        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
          key={index}
        >
          <div className="featured__item">
            <div
              className="featured__item__pic set-bg"
              style={{backgroundImage: `url(${image})`}}
            >
              <ul className="featured__item__pic__hover">
                <li>
                  <a href="#">
                    <i className="fa fa-heart" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-retweet" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-shopping-cart" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="featured__item__text">
              <h6>
                <a href="#">{product.name}</a>
              </h6>
              <h5>${product.newPrice}</h5>
            </div>
          </div>
        </div>
      )
    })
  }
  return(
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Product</h2>
            </div>
            <div className="featured__controls">
              <ul>
                <li className={selectedFeatureCategory == "All" ? "active" : ""} onClick={() => setSelectedFeatureCategory("All")}>
                  All
                </li>
                {categories.map((category, index) => (
                  <li className={selectedFeatureCategory == category.id ? "active" : ""} onClick={() => setSelectedFeatureCategory(category.id)} key={index}>{category.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row featured__filter">
          {renderProduct()}
        </div>
      </div>
  </section>
  );
}

export default FeatureProduct;
