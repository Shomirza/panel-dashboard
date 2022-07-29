import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InputCart,
  DeleteCart,
  ClearCart,
  Checkout,
} from "../../Redux/Reducer/CartReducer";
import { Table } from "reactstrap";
import { NavLink } from "react-router-dom";
import EmptyCart from "./EmptyCart.png";
import { ToastContainer, toast } from "react-toastify";

function Cart() {
  const cart = useSelector((state) => state.CartReducer.cart);
  const dispatch = useDispatch();
  const subTotal = cart.reduce((a, b) => {
    a += b.price * b.amount;
    return a;
  }, 0);
  const tax = (subTotal / 100) * 18;

  const notify = () => toast("Checkout success!");
  const clear = () => toast("Clear success!");

  function Submit() {
    dispatch(Checkout(cart));
    notify();
  }
  return (
    <div className=" d-flex align-items-center" style={{ height: "100vh" }}>
      {cart.length !== 0 ? (
        <div className="d-flex justify-content-around flex-wrap p-3 h-100 w-100">
          <div className="cartBlock col-md-7 col-10 mt-3 formShadow pt-4 ps-3 pe-3 pb-4">
            <Table className="table">
              <thead>
                <tr>
                  <th>PHOTO</th>
                  <th>NAME</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th>TOTAL</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        className="ProductImg"
                        src={`https://store-management-backend-app.herokuapp.com/api/v1/attachment/${item.imageId}`}
                        alt={`${
                          item.productName.length > 15
                            ? `${item.productName.substr(0, 15)}...`
                            : item.productName
                        }`}
                      />
                    </td>
                    <td>
                      {"  "}
                      {item.productName.length > 15
                        ? `${item.productName.substr(0, 15)}...`
                        : item.productName}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.amount}
                        className={"cartInput"}
                        onChange={(e) =>
                          dispatch(
                            InputCart({
                              id: item.productId,
                              amount: e.target.value,
                            })
                          )
                        }
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>{item.amount * item.price}</td>
                    <td>
                      <button
                        onClick={
                          () => dispatch(DeleteCart(item)) /* , clear() */
                        }
                        className="btn btn-danger"
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="cartBlock2 col-md-4 col-10 mt-3 d-flex flex-column">
            <div className="formShadow p-4">
              <h3 className="fw-bold w-100">Price</h3>
              <div className="total w-100">
                <p className="w-100">
                  <span className="w-50 d-inline-block pe-2 text-end">
                    Sub Total:
                  </span>
                  <span className="w-50 d-inline-block ps-2">
                    $ {subTotal}{" "}
                  </span>
                </p>
                <p className="w-100">
                  <span className="w-50 d-inline-block pe-2 text-end">
                    Shipping:
                  </span>
                  <span className="w-50 d-inline-block ps-2">Free</span>
                </p>
                <p className="w-100">
                  <span className="w-50 d-inline-block pe-2 text-end">
                    Tax(18%):
                  </span>
                  <span className="w-50 d-inline-block ps-2">
                    $ {parseInt(tax)}
                  </span>
                </p>
                <b className="w-100">
                  <span className="w-50 d-inline-block pe-2 text-end">
                    Total:
                  </span>
                  <span className="w-50 d-inline-block ps-2">
                    $ {parseInt(subTotal + tax)}
                  </span>
                </b>
              </div>
            </div>
            <div className="d-flex justify-content-around align-items-center flex-wrap mb-5 p-4">
              <NavLink to={"/orders"}>
                <button className="btn btn-primary mt-2">{"<<<"} Orders</button>
              </NavLink>
              <button
                onClick={() => dispatch(ClearCart())}
                className="btn btn-danger col-md-4 col-6 mt-2"
              >
                All Clear
              </button>
              <button onClick={Submit} className="btn btn-success mt-2">
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="EmptyCart d-flex justify-content-center w-100 h-100 bg-light p-4">
          <ToastContainer />
          <div className="d-flex flex-column align-items-center w-100 formShadow">
            <img
              src={EmptyCart}
              alt="Empty Cart"
              className="rounded-circle emptyCart mt-3"
            />
            <h2 className="fw-bold">Your Cart is empty😕</h2>
            <h4 className="w-50 text-center">
              Looks like you have not added anything to you cart. Go to Product
              List
            </h4>
            <NavLink to={"/orders"}>
              <button className="btn btn-primary mb-5">
                {"<<<"} Go to Orders
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
