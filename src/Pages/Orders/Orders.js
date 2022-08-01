import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../../Redux/Reducer/Orders";
import { Select } from "antd";
import { PushCart, PullCart } from "../../Redux/Reducer/CartReducer";
import Loader from "../../Loader/loader";

function Orders() {
  const product = useSelector((state) => state.Products.Product);
  const cart = useSelector((state) => state.CartReducer.cart);
  const dispatch = useDispatch();
  const [date, SetDate] = useState("");
  const [search, setSearch] = useState("");
  const [selectSearch, setSelectSearch] = React.useState("");
  const [category, setCategory] = useState("");
  const { Option } = Select;

  function onChange(value) {
    setCategory(value);
    setSelectSearch("");
  }
  function onSearch(val) {}

  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  return (
    <div className="Context">
      <div className="header d-flex justify-content-between align-items-center">
        <span>
          <h4 className="d-inline-block fw-bold">Orders</h4>
          <span>
            {" "}
            {
              product.filter((item) => {
                if (category) {
                  return item.category === category;
                } else if (date) {
                  return (
                    new Date(item.createdAt).toLocaleDateString() ===
                    new Date(date).toLocaleDateString()
                  );
                } else {
                  return item;
                }
              }).length
            }{" "}
            products found
          </span>
        </span>
        <input
          className="Primary"
          type="date"
          onChange={(e) => SetDate(e.target.value)}
        />
      </div>
      <div className="OrdersBody p-4">
        <div className="d-flex justify-content-between align-items-center">
          <Select
            className="antdSelect"
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="">All</Option>
            <Option value="computer">Computers</Option>
            <Option value="smartphone">Smartphones</Option>
            <Option value="watch">Watches</Option>
            <Option value="other">Other</Option>
          </Select>
          <NavLink to={"/cart"}>
            <button className="Primary ps-5 pe-5">
              <i className="bi bi-cart"></i> {"   "} {cart.length}{" "}
            </button>
          </NavLink>
        </div>
        {product.length === 0 ? (
          <div className="load mt-5" style={{ height: "65vh" }}>
            <Loader />
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {/* <th>№</th> */}
                <th>ID</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Edit or Delete</th>
              </tr>
            </thead>
            <tbody>
              {product
                .filter((item) => {
                  if (category) {
                    return item.category === category;
                  }
                  if (date === "") {
                    return item;
                  } else if (date) {
                    return (
                      new Date(item.createdAt).toLocaleDateString() ===
                      new Date(date).toLocaleDateString()
                    );
                  } else {
                    return item;
                  }
                })
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{index + 1}</td> */}
                      <td>#{item.id}</td>
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
                        {"  "}
                        {item.productName.length > 15
                          ? `${item.productName.substr(0, 15)}...`
                          : item.productName}
                      </td>
                      <td>
                        {item.description}
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} $</td>
                      <td>
                        {cart.find(
                          (cartItem) => cartItem.productId === item.id
                        ) ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => dispatch(PullCart(item))}
                          >
                            <i className="bi bi-cart-dash-fill"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary"
                            onClick={() => dispatch(PushCart(item))}
                          >
                            <i className="bi bi-cart-plus-fill"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orders;
