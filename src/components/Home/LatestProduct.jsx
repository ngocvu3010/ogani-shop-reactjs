import productImage from '../../img/latest-product/lp-1.jpg';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectLatestProductSelector, selectTopRateProductSelector, selectReviewProductSelector} from "../../redux/selector";
import {getTopProducts} from '../../redux/actions';
import ProductList from './ProductList';

function LatestProduct() {
  const lastestProducts = useSelector(selectLatestProductSelector);
  const topRateProducts = useSelector(selectTopRateProductSelector);
  const reviewProducts = useSelector(selectReviewProductSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopProducts());
  }, []);

  return(
    <section className="latest-product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Latest Products</h4>
              <div className="latest-product__slider owl-carousel">
                <div className="latest-prdouct__slider__item">
                  <ProductList products={lastestProducts} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Top Rated Products</h4>
              <div className="latest-product__slider owl-carousel">
                <div className="latest-prdouct__slider__item">
                  <ProductList products={topRateProducts} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Review Products</h4>
              <div className="latest-product__slider owl-carousel">
                <div className="latest-prdouct__slider__item">
                  <ProductList products={reviewProducts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestProduct;
