import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../../Redux/Reducer/Orders";
import { Select } from "antd";
import DeleteProductModal from "./DeleteProduct";
import EditModal from "./EditProduct";
import Loader from "../../Loader/loader";

function Product() {
  const product = useSelector((state) => state.Products.Product);
  const dispatch = useDispatch();
  const [date, SetDate] = useState("");
  const [category, setCategory] = useState("");
  const { Option } = Select;
  const [edit, setEdit] = useState("");
  const [deletePr, setDeletePr] = useState("");
  const [selectSearch, setSelectSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);

  const toggle = () => setModal((prev) => !prev);
  const toggle2 = () => setOpen((prev) => !prev);

  useEffect(() => {
    dispatch(GetProduct());
  }, []);

  function searchByCategory(value) {
    setCategory(value);
    setSelectSearch("");
  }
  function onSearch(val) {}

  function startEdit(item) {
    setEdit(item);
    toggle2();
  }

  function deleteProduct(item) {
    setDeletePr(item);
    toggle();
  }

  return (
    <div className="Context">
      <div className="header d-flex justify-content-between align-items-center">
        <span>
          <h4 className="d-inline-block fw-bold">Products</h4>
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
            onChange={searchByCategory}
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
          <NavLink to={"/create"}>
            <button className="Primary">+ Add Product</button>
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
                  if (date) {
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
                      <td>{item.description}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} $</td>
                      <td>
                        <button
                          onClick={() => startEdit(item)}
                          className="btn btn-primary m-1"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => {
                            deleteProduct(item);
                          }}
                          className="btn btn-danger m-1"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <DeleteProductModal modal={modal} toggle={toggle} item={deletePr} />
      <EditModal modal={open} toggle={toggle2} edit={edit} />
    </div>
  );
}

export default Product;
