import productImage from '../../img/categories/cat-1.jpg';
import React, { Component } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Category() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return(
    <section className="categories">
      <div className="container">
        <div className="row">
          <div className="categories__slider owl-carousel">
            <Slider {...settings}>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  style={{backgroundImage: `url(${productImage})`}}
                >
                  <h5>
                    <a href="#">Fresh Fruit</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  style={{backgroundImage: `url(${productImage})`}}
                >
                  <h5>
                    <a href="#">Dried Fruit</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  style={{backgroundImage: `url(${productImage})`}}
                >
                  <h5>
                    <a href="#">Vegetables</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  style={{backgroundImage: `url(${productImage})`}}
                >
                  <h5>
                    <a href="#">drink fruits</a>
                  </h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="categories__item set-bg"
                  style={{backgroundImage: `url(${productImage})`}}
                >
                  <h5>
                    <a href="#">drink fruits</a>
                  </h5>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
