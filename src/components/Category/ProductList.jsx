import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import {updateCart, updateLike} from "../../redux/actions";
import {selectCartSelector} from "../../redux/selector";
import Product from "../Product"
import {getCurrentUserSelector} from "../../redux/selector";
import {flashSuccess, flashError} from "../../untils/flash";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};
const totalPerPage = 4;

function ProductList({products, orderType, setOrderType, page, setPage}) {
  const currentUser = useSelector(getCurrentUserSelector);
  const cartDataInfo = useSelector(selectCartSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  const saledProduct = products.filter(product => product.sale);
  const totalProduct = useSelector((state) => state.productReducer.totalProduct)
  const totalPage = Math.ceil(parseInt(totalProduct) / totalPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const handleChangeSort = (event) => {
    setOrderType(event.target.value);
  }

  const discount = (product) => {
    const price = product.oldPrice - product.newPrice;
    return Math.ceil(price * 100/ product.oldPrice);
  }

  const handleAddCart = (product) => {
    if (currentUser) {
      const cartData = cartDataInfo.cartData;
      let arr = [];
      if (cartData.length) {
        const selectedItem = cartData.find((item) => item.id == product.id);

        if (selectedItem) {
          const selectedIndex = cartData.findIndex((item) => item.id == product.id);
          cartData.splice(selectedIndex, 1, {...selectedItem, amount: selectedItem.amount + 1});
          arr = [...cartData];
        } else {
          const item = {id: product.id, name: product.name, price: product.newPrice, amount: 1};
          arr = [...cartData, item];
        }
      } else {
        const item = {id: product.id, name: product.name, price: product.newPrice, amount: 1};
        arr = [...cartData, item];
      }
      dispatch(updateCart({cartData: arr, userId: currentUser.id}))
    } else {
      flashError("🦄 Bạn cần đăng nhập trước khi mua hàng");

      history.push("/login");
    }
  };

  const handleLikeProduct = (product) => {
    const likeData = JSON.parse(localStorage.getItem("likeProduct")) || [];
    const selectedItem = likeData.find((item) => item === product.id);
    let arr = [];
    if (selectedItem) {
      arr = [...likeData];
    } else arr = [...likeData, product.id];

    localStorage.setItem("likeProduct", JSON.stringify(arr));
    flashSuccess("🦄 Thêm sản phẩm thành công")
  }

  return(
    <div className="col-lg-9 col-md-7">
      <div className="product__discount">
        <div className="section-title product__discount__title">
          <h2>Sale Off</h2>
        </div>
        <div className="row">
          <div className="product__discount__slider owl-carousel">
            <Slider {...settings}>
              {saledProduct.map((product, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="product__discount__item">
                    <div
                      className="product__discount__item__pic set-bg"
                      data-setbg="img/product/discount/pd-1.jpg"
                      style={{backgroundImage: `url(${product && product.img && product.img[0]})`}}
                    >
                      <div className="product__discount__percent">-{discount(product)}%</div>
                      <ul className="product__item__pic__hover">
                        <li>
                          <a href="#">
                            <i className="fa fa-heart" onClick={() => handleLikeProduct(product)}/>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-retweet" />
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={() => handleAddCart(product)}>
                            <i className="fa fa-shopping-cart" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__discount__item__text">
                      <span>{product.name}</span>
                      <h5>
                        <a href="#">{product.name}</a>
                      </h5>
                      <div className="product__item__price">
                        ${product.newPrice} <span>${product.oldPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="filter__item">
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="filter__sort">
              <span>Sort By</span>
              <select value={orderType} onChange={handleChangeSort}>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="filter__found">
              <h6>
                <span>{totalProduct}</span> Products found
              </h6>
            </div>
          </div>
          <div className="col-lg-4 col-md-3">
            <div className="filter__option">
              <span className="icon_grid-2x2" />
              <span className="icon_ul" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
            <Product product={product} />
          </div>
        ))}
      </div>
      <div className="product__pagination">
        {pageNumbers.map((page, index) => (
          <a href="#" key={index} onClick={() => setPage(page)}>{page}</a>
        ))}
        <a href="#">
          <i className="fa fa-long-arrow-right" />
        </a>
      </div>
    </div>
  )
}
export default ProductList;
