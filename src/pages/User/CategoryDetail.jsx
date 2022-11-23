import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetailCategory, getHomeProducts} from "../../redux/actions";
import {selectCategoryDetailSelector, selectFeatureProductSelector} from "../../redux/selector";
import breadcum from '../../img/breadcrumb.jpg';
import ProductList from "../../components/Category/ProductList";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {COLORS, SIZES, PRDUCT_PER_PAGE} from "../../constants";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

function CategoryDetail() {
  const {categoryId} = useParams();
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [price, setPrice]= useState([0, 1000000]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [orderType, setOrderType] = useState("asc");
  const [page, setPage] = useState("1");
  const dispatch = useDispatch();
  const category = useSelector(selectCategoryDetailSelector);
  const products = useSelector(selectFeatureProductSelector);
  const allCategory = category && category.sub && category.sub.map(({id}) => id);

  const handleChangePrice = (event, value) => {
    setPrice(value);
  }

  const handleChangeColor = (color) => {
    setSelectedColor(color);
  }

  useEffect(() => {
    dispatch(getDetailCategory(categoryId));
  }, []);

  useEffect(() => {
    let params = ``;
    if (allCategory || selectedSubCategory || selectedColor || selectedSize) {
      if (allCategory && selectedSubCategory === "") {
        allCategory.forEach((categoryId) => {
          params +=`&categoryId=${categoryId}`;
        })
      }

      if (selectedSubCategory) {
        params +=`&categoryId=${selectedSubCategory}`;
      }

      if (selectedColor) {
        params +=`&color=${selectedColor}`;
      }
      if (selectedSize) {
        params +=`&size=${selectedSize}`;
      }
      params +=`&newPrice_gte=${price[0]}&newPrice_lte=${price[1]}`;
      params +=`&_sort=newPrice&_order=${orderType}`;
      params +=`&_page=${page}&_limit=${PRDUCT_PER_PAGE}`;
      dispatch(getHomeProducts(params.substring(1)))
    }
  }, [category, selectedSubCategory, price, selectedColor, selectedSize, orderType, page]);

  const clearCondition = () => {
    return selectedSubCategory !== "" || price[0] !== 0 || price[1] !== 1000000 ||
      selectedColor !== "" || selectedSize !== "";
  }

  const clearFilter = () => {
    setSelectedSubCategory("");
    setPrice([0, 1000000]);
    setSelectedColor("");
    setSelectedSize("");
  };
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
                <h2>Organi Shop</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">Home</a>
                  <span>{category.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <div id="clear-all" style={{ display: clearCondition() ? 'block' : 'none'}}>
                      <div className="ais-root ais-clear-all btn btn-block btn-default">
                        <div className="ais-body ais-clear-all--body">
                          <a className="ais-clear-all--link" href="javascript:void(0);"
                            onClick={() => clearFilter()}
                          >
                            <div><i className="fa fa-eraser"></i> Clear all filters</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  <h4>Sub Category</h4>
                  <ul>
                    <li onClick={() => setSelectedSubCategory("")}>
                      <a href="#" className={"" === selectedSubCategory ? 'active' : ''}>All</a>
                    </li>
                    {category && category.sub && category.sub.map((subCate, index) => (
                      <li>
                        <a href="#" key={index}
                          onClick={() => setSelectedSubCategory(subCate.id)}
                          className={subCate.id === selectedSubCategory ? 'active' : ''}
                        >
                          {subCate.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar__item">
                  <h4>Price</h4>
                  <div className="price-range-wrap">
                    <Slider getAriaLabel={() => 'price range'}
                      value={price}
                      onChange={handleChangePrice}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000000}
                    />
                    <div className="range-slider">
                      <div className="price-input">
                        $<input type="text" id="minamount" value={price[0]} />
                        $<input type="text" id="maxamount" value={price[1]}/>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="sidebar__item sidebar__item__color--option">
                  <h4>Colors</h4>
                  {COLORS.map((color, index) => (
                    <div key ={index} className={`sidebar__item__color sidebar__item__color--${color.toLowerCase()} ${color == selectedColor ? 'active' : ''}`}
                      onClick={() => handleChangeColor(color)}
                    >
                      <label htmlFor={color}>
                        {color}
                        <input type="radio" id={color} />
                      </label>
                    </div>
                  ))}
                </div>
                <div className="sidebar__item">
                  <h4>Popular Size</h4>
                  {SIZES.map((size, index) => (
                    <div className={`sidebar__item__size `} key={index}
                      onClick={() => setSelectedSize(size)}
                    >
                      <label htmlFor={size} className={`${size === selectedSize ? 'active' : ''}`}>
                        {size}
                        <input type="radio" id={size} />
                      </label>
                    </div>
                  ))}

                </div>
              </div>
            </div>
            <ProductList products={products}
              orderType={orderType} setOrderType={setOrderType}
              page={page} setPage={setPage} />
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </>

  );
}
export default CategoryDetail;
