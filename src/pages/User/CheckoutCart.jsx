import breadcum from '../../img/breadcrumb.jpg';
import {selectCartSelector, getCurrentUserSelector} from "../../redux/selector";
import {updateCart} from "../../redux/actions";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";


function CheckoutCart() {
  const carts = useSelector(selectCartSelector).cartData;
  const total = carts.reduce((sum, item) => sum + (item.price * item.amount), 0);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);

  const updateCartInfo = (cart, type) => {
    let arr = [...carts];
    let amount = cart.amount;
    const elementIndex = carts.findIndex(object => object.id == cart.id);

    if (type == "-") {
      amount = cart.amount - 1;
    } else {
      amount = cart.amount + 1;
    }
    arr.splice(elementIndex, 1, {...cart, amount: amount});
    dispatch(updateCart({cartData: arr, userId: currentUser.id}))
  };

  const removeItem = (cartId) => {
    let arr = [...carts];
    const removeIndex = carts.findIndex(object => object.id == cartId);
    arr.splice(removeIndex, 1);
    dispatch(updateCart({cartData: arr, userId: currentUser.id}))
  };

  return(
    <>
      <section
        className="breadcrumb-section set-bg"
        style={{backgroundImage: `url(${breadcum})`}}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Shopping Cart</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">Home</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {carts.length && carts.map((cart, index) => (
                      <tr key={index}>
                        <td className="shoping__cart__item">
                          <img src="img/cart/cart-1.jpg" alt="" />
                          <h5>{cart.name}</h5>
                        </td>
                        <td className="shoping__cart__price">${cart.price}</td>
                        <td className="shoping__cart__quantity">
                          <div className="quantity">
                            <div className="pro-qty">
                              <span class="dec qtybtn" onClick={() => updateCartInfo(cart, "-")}>-</span>
                                <input type="text" value={cart.amount} />
                              <span class="inc qtybtn" onClick={() => updateCartInfo(cart, "+")}>+</span>
                            </div>
                          </div>
                        </td>
                        <td className="shoping__cart__total">${cart.amount * cart.price}</td>
                        <td className="shoping__cart__item__close">
                          <span className="icon_close" onClick={() => removeItem(cart.id)} />
                        </td>
                      </tr>
                    ))};
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link to="/">
                  <a href="#" className="primary-btn cart-btn">
                    CONTINUE SHOPPING
                  </a>
                </Link>
                <Link to="/carts">
                  <a href="#" className="primary-btn cart-btn cart-btn-right">
                    <span className="icon_loading" />
                    Upadate Cart
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shoping__continue">
                <div className="shoping__discount">
                  <h5>Discount Codes</h5>
                  <form action="#">
                    <input type="text" placeholder="Enter your coupon code" />
                    <button type="submit" className="site-btn">
                      APPLY COUPON
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>
                    Subtotal <span>${total}</span>
                  </li>
                  <li>
                    Total <span>${total}</span>
                  </li>
                </ul>
                {carts.length ? (<Link to="/billing">
                  <a href="#" className="primary-btn">
                    PROCEED TO CHECKOUT
                  </a>
                </Link>) : ""}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

export default CheckoutCart;
