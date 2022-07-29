import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHistory } from "../../Redux/Reducer/GetHistory";
import { GetProduct } from "../../Redux/Reducer/Orders";
import Cards from "./Cards";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
  

function Dashboard() {
  const history = useSelector((state) => state.GetHistory.history);
  const product = useSelector((state) => state.Products.Product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory());
    dispatch(GetProduct());
  }, []);

  return (
    <div
      className="Context"
      style={{ background: "#FAFAFA" }}
    >
      <div className="header d-flex align-items-center">
        <h3 className="fw-bold">Dashboard</h3>
      </div>
      <div className="DashBody p-4 pt-4">
        <Cards />
        <div className="fCharts mt-5 mb-5 d-flex justify-content-around align-items-center flex-wrap">
          <div className="col-md-7  col-12 mt-2 bg-white pe-3 pt-3 h-100 rounded15 hShadow">
            <BarChart />
          </div>
          <div className="col-md-4 col-12 mt-2 bg-white p-4 h-100 rounded15 hShadow">
            <AreaChart />
          </div>
        </div>
        <div className="sCharts d-flex justify-content-around align-items-center flex-wrap mb-5">
          <div className="sLeftChart col-md-7  col-12 mt-4 bg-white p-4 pt-2 rounded15 hShadow">
            <h3 className="fw-bold">Recent Orders</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => {
                  return item.productList.map((item1, index1) => (
                    <tr key={index1}>
                      <td>#{item1.product.id}</td>
                      <td>
                        <img
                          className="ProductImg"
                          src={`https://store-management-backend-app.herokuapp.com/api/v1/attachment/${item1.product.imageId}`}
                          alt={`${
                            item1.product.productName.length > 15
                              ? `${item1.product.productName.substr(0, 15)}...`
                              : item1.product.productName
                          }`}
                        />
                        {"  "}
                        {item1.product.productName.length > 15
                          ? `${item1.product.productName.substr(0, 15)}...`
                          : item1.product.productName}
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item1.amount}</td>
                      <td>${item1.product.price}</td>
                      <td>
                        <span className="text-success">Sold out</span>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
          <div className="sRightChart col-md-4 col-12 mt-4 bg-white h-100 rounded15 hShadow">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
