import Slider from "react-slick";
import {useSelector} from 'react-redux';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};
const totalPerPage = 4;

function ProductList({products, orderType, setOrderType, page, setPage}) {
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
            <div className="product__item">
              <div
                className="product__item__pic set-bg"
                style={{backgroundImage: `url(${product && product.img && product.img[0]})`}}
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
                  <a href="#">{product.name}</a>
                </h6>
                <h5>${product.newPrice}</h5>
              </div>
            </div>
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
