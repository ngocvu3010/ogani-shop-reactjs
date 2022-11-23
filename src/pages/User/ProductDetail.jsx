import breadcum from '../../img/breadcrumb.jpg';
import {useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductDetail, updateCart, updateLike} from "../../redux/actions";
import {selectProductSelector, selectCartSelector} from "../../redux/selector";
import Slider from "react-slick";
import {flashSuccess, flashError} from "../../untils/flash";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

function ProductDetail() {
  const cartDataInfo = useSelector(selectCartSelector);
  const currentUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  const [amount, setAmount] = useState(1);

  const {productId} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductSelector);
  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, []);

  const handleAddCart = (product) => {
    if (currentUser) {
      const cartData = cartDataInfo.cartData;
      let arr = [];
      if (cartData.length) {
        const selectedItem = cartData.find((item) => item.id == product.id);

        if (selectedItem) {
          const selectedIndex = cartData.findIndex((item) => item.id == product.id);
          cartData.splice(selectedIndex, 1, {...selectedItem, amount: selectedItem.amount + amount});
          arr = [...cartData];
        } else {
          const item = {id: product.id, name: product.name, price: product.newPrice, amount: amount};
          arr = [...cartData, item];
        }
      } else {
        const item = {id: product.id, name: product.name, price: product.newPrice, amount: amount};
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
    flashSuccess("🦄 Thêm sản phẩm thành công");
  }

  return(
    <>
      {/* Breadcrumb Section Begin */}
      <section
        className="breadcrumb-section set-bg"
        style={{backgroundImage: `url(${breadcum})`}}

      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>{product.name}</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">Home</a>
                  <a href="./index.html">Vegetables</a>
                  <span>Vegetable’s Package</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Product Details Section Begin */}
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img
                    className="product__details__pic__item--large"
                    src={product && product.img && product.img[0]}
                    alt=""
                  />
                </div>
                <div className="product__details__pic__slider owl-carousel" style={{"width": "50%"}}>
                  <Slider {...settings}>
                    {
                      product && product.img && product.img.map((image, index) => (
                      <img src={image} alt="" key={index} />
                      ))
                    }
                  </Slider>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{product.name}</h3>
                <div className="product__details__rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                  <span>(18 reviews)</span>
                </div>
                <div className="product__details__price">${product.newPrice}</div>
                <p>
                  Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                  Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                  dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                  vehicula elementum sed sit amet dui. Proin eget tortor risus.
                </p>
                <div className="product__details__quantity">
                  <div className="quantity">
                    <div className="pro-qty">
                      <span className="dec qtybtn" onClick={() => setAmount(amount == 0 ? 0 : (amount - 1))}>-</span>
                      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                      <span className="inc qtybtn" onClick={() => setAmount(amount + 1)}>+</span></div>
                  </div>
                </div>
                <a href="#" className="primary-btn" onClick={() => handleAddCart(product)}>
                  ADD TO CARD
                </a>
                <a href="#" className="heart-icon" onClick={() => handleLikeProduct(product)}>
                  <span className="icon_heart_alt" />
                </a>
                <ul>
                  <li>
                    <b>Availability</b> <span>In Stock</span>
                  </li>
                  <li>
                    <b>Shipping</b>{" "}
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>
                  <li>
                    <b>Weight</b> <span>0.5 kg</span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div className="share">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                      aria-selected="false"
                    >
                      Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-3"
                      role="tab"
                      aria-selected="false"
                    >
                      Reviews <span>(1)</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed sit
                        amet dui. Pellentesque in ipsum id orci porta dapibus. Proin
                        eget tortor risus. Vivamus suscipit tortor eget felis
                        porttitor volutpat. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Donec rutrum congue leo
                        eget malesuada. Vivamus suscipit tortor eget felis porttitor
                        volutpat. Curabitur arcu erat, accumsan id imperdiet et,
                        porttitor at sem. Praesent sapien massa, convallis a
                        pellentesque nec, egestas non nisi. Vestibulum ac diam sit
                        amet quam vehicula elementum sed sit amet dui. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices
                        posuere cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget tortor
                        risus.
                      </p>

                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed sit
                        amet dui. Pellentesque in ipsum id orci porta dapibus. Proin
                        eget tortor risus. Vivamus suscipit tortor eget felis
                        porttitor volutpat. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Donec rutrum congue leo
                        eget malesuada. Vivamus suscipit tortor eget felis porttitor
                        volutpat. Curabitur arcu erat, accumsan id imperdiet et,
                        porttitor at sem. Praesent sapien massa, convallis a
                        pellentesque nec, egestas non nisi. Vestibulum ac diam sit
                        amet quam vehicula elementum sed sit amet dui. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices
                        posuere cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget tortor
                        risus.
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-3" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed sit
                        amet dui. Pellentesque in ipsum id orci porta dapibus. Proin
                        eget tortor risus. Vivamus suscipit tortor eget felis
                        porttitor volutpat. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Donec rutrum congue leo
                        eget malesuada. Vivamus suscipit tortor eget felis porttitor
                        volutpat. Curabitur arcu erat, accumsan id imperdiet et,
                        porttitor at sem. Praesent sapien massa, convallis a
                        pellentesque nec, egestas non nisi. Vestibulum ac diam sit
                        amet quam vehicula elementum sed sit amet dui. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices
                        posuere cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget tortor
                        risus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section End */}
      {/* Related Product Section Begin */}
      <section className="related-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related__product__title">
                <h2>Related Product</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-1.jpg"
                >
                  <ul className="product__item__pic__hover">
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
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-2.jpg"
                >
                  <ul className="product__item__pic__hover">
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
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-3.jpg"
                >
                  <ul className="product__item__pic__hover">
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
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-7.jpg"
                >
                  <ul className="product__item__pic__hover">
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
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related Product Section End */}
    </>
  )
}

export default ProductDetail;
