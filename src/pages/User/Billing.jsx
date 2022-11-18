import React, {useState} from "react";
import breadcum from '../../img/breadcrumb.jpg';
import {selectCartSelector, getCurrentUserSelector} from "../../redux/selector";
import {updateCart, createBilling} from "../../redux/actions";
import {useSelector, useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { ErrorMessage } from '@hookform/error-message';
import {useForm} from "react-hook-form";
import {TEL_REGEX, EMAIL_REGEX} from "../../constants"

function Billing() {
  const carts = useSelector(selectCartSelector).cartData;
  const total = carts.reduce((sum, item) => sum + (item.price * item.amount), 0);
  const currentUser = JSON.parse(localStorage.getItem("account"));
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    criteriaMode: "all"
  });
  const renderError = (fieldName) => {
    return( <div className="error"><ErrorMessage
      errors={errors}
      name={fieldName}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p key={type}>{message}</p>
        ))
      }
    /></div>)
  }

  const submitBilling = (values) => {
    if (Object.keys(errors).length > 0) return;
    const params = {
      firstName: values.firstName,
      lastName: values.lastName,
      street: values.street,
      department: values.department,
      city: values.city,
      phone: values.phone,
      note: values.note,
      email: values.email,
      userId: currentUser.id,
      carts: carts,
      total: total
    }
    dispatch(createBilling(params))
    history.push("/");
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
      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6>
                <span className="icon_tag_alt" /> Have a coupon?{" "}
                <a href="#">Click here</a> to enter your code
              </h6>
            </div>
          </div>
          <div className="checkout__form">
            <h4>Billing Details</h4>
            <form onSubmit={handleSubmit(submitBilling)}>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Fist Name<span>*</span>
                        </p>
                        <input type="text"
                          defaultValue={currentUser?.first}
                          {...register("firstName", {
                            required: "This is Required",
                            maxLength: {
                              value: 10,
                              message: "This input exceed maxLength 10 characters"
                            }
                          })}
                        />
                        {renderError("firstName")}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Last Name<span>*</span>
                        </p>
                        <input type="text"
                          defaultValue={currentUser?.last}
                          {...register("lastName", {
                            required: "This is Required",
                            maxLength: {
                              value: 10,
                              message: "This input exceed maxLength 10 characters"
                            }
                          })}  />
                        {renderError("lastName")}
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Address<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="checkout__input__add"
                      {...register("street", {
                        required: "This is Required",
                        maxLength: {
                          value: 100,
                          message: "This input exceed maxLength 100 characters"
                        }
                      })}
                    />
                    {renderError("street")}
                    <input
                      type="text"
                      placeholder="Apartment, suite, unite ect (optinal)"
                      {...register("department", {
                            required: "This is Required",
                            maxLength: {
                              value: 100,
                              message: "This input exceed maxLength 100 characters"
                            }
                          })}  />
                      {renderError("department")}
                  </div>
                  <div className="checkout__input">
                    <p>
                      Town/City<span>*</span>
                    </p>
                    <input type="text"
                      {...register("city", {
                        required: "This is Required",
                        maxLength: {
                          value: 10,
                          message: "This input exceed maxLength 10 characters"
                        }
                      })
                      }/>
                      {renderError("city")}

                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Phone<span>*</span>
                        </p>
                        <input type="text"
                          {...register("phone", {
                            required: "This is Required",
                            maxLength: {
                              value: 10,
                              message: "This input exceed maxLength 10 characters"
                            },
                            pattern: {
                              value: TEL_REGEX,
                              message: "This input is number only"
                            }
                            })}  />
                        {renderError("phone")}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Email<span>*</span>
                        </p>
                        <input type="text"
                          defaultValue={currentUser?.email}
                          {...register("email", {
                            required: "This is Required",
                            maxLength: {
                              value: 100,
                              message: "This input exceed maxLength 100 characters"
                            },
                            pattern: {
                              value: EMAIL_REGEX,
                              message: "wrong email format"
                            }
                            })}  />
                        {renderError("email")}
                      </div>
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Order notes<span></span>
                    </p>
                    <input
                      type="text"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      {...register("note", { maxLength: {value: 100, message: "This input exceed maxLength 100 characters"} })}  />
                    {renderError("note")}

                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Your Order</h4>
                    <div className="checkout__order__products">
                      Products <span>Total</span>
                    </div>
                    <ul>
                      {carts.map((cart, index) => (
                        <li key={index}>
                          {cart.name}
                          <span>${cart.price * cart.amount}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="checkout__order__subtotal">
                      Subtotal <span>${total}</span>
                    </div>
                    <div className="checkout__order__total">
                      Total <span>${total}</span>
                    </div>
                    {carts.length ? (<button type="submit" className="site-btn">
                      PLACE ORDER
                    </button>) : ""}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Billing;
