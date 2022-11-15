import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/actions";
import "../../css/custom/login.scss"

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const password = event.target[1].value;
    dispatch(loginUser({name, password, history: history}));
  };

  return(
    <div id="login">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>Free Shipping for all Order of $99</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  <a href="#">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin" />
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest-p" />
                  </a>
                </div>
                <div className="header__top__right__language">
                  <img src="img/language.png" alt="" />
                  <div>English</div>
                  <span className="arrow_carrot-down" />
                  <ul>
                    <li>
                      <a href="#">Spanis</a>
                    </li>
                    <li>
                      <a href="#">English</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="logo" />
      <div className="login-block">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" defaultValue="" placeholder="Username" id="username" />
          <input
            type="password"
            defaultValue=""
            placeholder="Password"
            id="password"
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
