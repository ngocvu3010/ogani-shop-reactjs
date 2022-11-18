import {useHistory, Link} from "react-router-dom";
import {updateCart, updateLike} from "../redux/actions";
import {selectCartSelector, getCurrentUserSelector} from "../redux/selector";
import {flashSuccess, flashError} from "../untils/flash";
import {useSelector, useDispatch} from 'react-redux';

function Product({product}) {
  const cartDataInfo = useSelector(selectCartSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);

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
    flashSuccess("🦄 Thêm sản phẩm thành công");
  }

  return(
    <div className="product__item">
      <div
        className="product__item__pic set-bg"
        style={{backgroundImage: `url(${product && product.img && product.img[0]})`}}
      >
      <ul className="product__item__pic__hover">
        <li>
          <a href="#">
            <i className="fa fa-heart" onClick={() => handleLikeProduct(product)} />
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
    <Link to={`/product/${product.id}`}>
      <div className="product__item__text">
        <h6>
          <a href="#">{product.name}</a>
        </h6>
        <h5>${product.newPrice}</h5>
      </div>
    </Link>
  </div>
  );
}

export default Product;
