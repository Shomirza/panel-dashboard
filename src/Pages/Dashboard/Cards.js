import React from "react";
import { FaHandHoldingUsd, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHistory } from "../../Redux/Reducer/GetHistory";
import { GetProduct } from "../../Redux/Reducer/Orders";

function Cards() {
  const history = useSelector((state) => state.GetHistory.history);
  const product = useSelector((state) => state.Products.Product);
  const dispatch = useDispatch();
  let todaySales = 0;
  let lastDaySales = 0;
  let todayExpense = 0;
  let lastDayExpense = 0;
  let todayAdded = 0;
  let lastDayAdded = 0;
  let todayOrders = 0;
  let lastDayOrders = 0;

  let today = new Date().toLocaleDateString();
  let lastDay = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString();

  useEffect(() => {
    dispatch(getHistory());
    dispatch(GetProduct());
  }, []);

  history.map((item) => {
    if (lastDay === new Date(item.createdAt).toLocaleDateString()) {
      lastDaySales += item.productList.reduce((a, b) => {
        a += b.product.price * b.amount;
        return a;
      }, 0);
    }
  });
  history.map((item) => {
    if (today === new Date(item.createdAt).toLocaleDateString()) {
      todaySales += item.productList.reduce((a, b) => {
        a += b.product.price * b.amount;
        return a;
      }, 0);
    }
  });
  let percentSales = parseInt(
    (todaySales * 100) / (lastDaySales !== 0 ? lastDaySales : todaySales)
  );

  todayExpense += product.reduce((a, b) => {
    if (today === new Date(b.createdAt).toLocaleDateString()) {
      a += b.price * b.amount;
    }
    return a;
  }, 0);
  lastDayExpense += product.reduce((a, b) => {
    if (lastDay === new Date(b.createdAt).toLocaleDateString()) {
      a += b.price * b.amount;
    }
    return a;
  }, 0);
  let percentExpense = parseInt(
    (todayExpense * 100) /
      (lastDayExpense !== 0 ? lastDayExpense : todayExpense)
  );

  todayAdded += product.reduce((a, b) => {
    if (today === new Date(b.createdAt).toLocaleDateString()) {
      a += b.amount;
    }
    return a;
  }, 0);
  lastDayAdded += product.reduce((a, b) => {
    if (lastDay === new Date(b.createdAt).toLocaleDateString()) {
      a += b.amount;
    }
    return a;
  }, 0);
  let percentAdded = parseInt(
    (todayAdded * 100) / (lastDayAdded !== 0 ? lastDayAdded : todayAdded)
  );

  history.map((item) => {
    if (lastDay === new Date(item.createdAt).toLocaleDateString()) {
      lastDayOrders += item.productList.reduce((a, b) => {
        a += b.amount;
        return a;
      }, 0);
    }
  });
  history.map((item) => {
    if (today === new Date(item.createdAt).toLocaleDateString()) {
      todayOrders += item.productList.reduce((a, b) => {
        a += b.amount;
        return a;
      }, 0);
    }
  });
  let percentOrders = parseInt(
    (todayOrders * 100) / (lastDayOrders !== 0 ? lastDayOrders : todaySales)
  );

  return (
    <div className="d-flex justify-content-around flex-wrap align-items-center">
      <div className="dashCard mt-2 rounded15 hShadow">
        <div className="d-flex justify-content-between align-items-center">
          <div className="iconBox d-flex justify-content-center align-items-center icon1">
            <FaDollarSign />
          </div>
          <BsThreeDotsVertical />
        </div>
        <h5 className="fw-bold mt-3 ms-2">$ {todaySales}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="ms-2 text-secondary">Today Sales</p>
          {percentSales < 100 ? (
            <h5 className="text-danger">
              <i class="bi bi-arrow-down-right-circle"></i> +{" "}
              {100 - percentSales}%
            </h5>
          ) : (
            <h5 className="text-success">
              <i className="bi bi-arrow-up-right-circle"></i> +{" "}
              {percentSales - 100}%
            </h5>
          )}
        </div>
      </div>
      <div className="dashCard mt-2 rounded15 hShadow">
        <div className="d-flex justify-content-between align-items-center">
          <div className="iconBox d-flex justify-content-center align-items-center icon2">
            <FaHandHoldingUsd />
          </div>
          <BsThreeDotsVertical />
        </div>
        <h5 className="fw-bold mt-3 ms-2">$ {todayExpense}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="ms-2 text-secondary">Today Expenses</p>
          {percentExpense < 100 ? (
            <h5 className="text-danger">
              <i class="bi bi-arrow-down-right-circle"></i> +
              {100 - percentExpense}%
            </h5>
          ) : (
            <h5 className="text-success">
              <i className="bi bi-arrow-up-right-circle"></i> +
              {percentExpense - 100}%
            </h5>
          )}
        </div>
      </div>
      <div className="dashCard mt-2 rounded15 hShadow">
        <div className="d-flex justify-content-between align-items-center">
          <div className="iconBox d-flex justify-content-center align-items-center icon3">
            <IoIosPeople />
          </div>
          <BsThreeDotsVertical />
        </div>
        <h5 className="fw-bold mt-3 ms-2">{todayAdded}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="ms-2 text-secondary">Today Visitors</p>
          {percentAdded < 100 ? (
            <h5 className="text-danger">
              <i class="bi bi-arrow-down-right-circle"></i> +
              {100 - percentAdded}%
            </h5>
          ) : (
            <h5 className="text-success">
              <i className="bi bi-arrow-up-right-circle"></i> +
              {percentAdded - 100}%
            </h5>
          )}
        </div>
      </div>
      <div className="dashCard mt-2 rounded15 hShadow">
        <div className="d-flex justify-content-between align-items-center">
          <div className="iconBox d-flex justify-content-center align-items-center icon4">
            <FaShoppingCart />
          </div>
          <BsThreeDotsVertical />
        </div>
        <h5 className="fw-bold mt-3 ms-2">{todayOrders}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="ms-2 text-secondary">Today Orders</p>
          {percentOrders < 100 ? (
            <h5 className="text-danger">
              <i class="bi bi-arrow-down-right-circle"></i> +
              {100 - percentOrders}%
            </h5>
          ) : (
            <h5 className="text-success">
              <i className="bi bi-arrow-up-right-circle"></i> +
              {percentOrders - 100}%
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
