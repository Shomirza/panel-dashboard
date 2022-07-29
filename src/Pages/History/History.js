import React, { useEffect, useState } from "react";
import { getHistory } from "../../Redux/Reducer/GetHistory";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/loader"

function History() {
  const history = useSelector((state) => state.GetHistory.history);
  const dispatch = useDispatch();
  const [date, SetDate] = useState("");

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <div className="Context">
      <div className="header d-flex justify-content-between align-items-center">
        <span>
          <h4 className="d-inline-block fw-bold">History</h4>
          <span>
            {" "}
            {
              history.filter((item) => {
                if (date === "") {
                  return item;
                } else if (item.createdAt.substring(0, 10) === date) {
                  return item;
                }
              }).length
            }{" "}
            found
          </span>
        </span>
        <input
          className="Primary"
          type="date"
          onChange={(e) => SetDate(e.target.value)}
        />
      </div>
      <div className="h-100 d-flex justify-content-center flex-wrap">
        {history.length === 0 ? (
          <div className="load mt-5 pt-5" style={{ height: "80vh" }}>
            <Loader />
          </div>
        ) : (
          history
            .filter((item) => {
              if (date === "") {
                return item;
              } else if (item.createdAt.substring(0, 10) === date) {
                return item;
              }
            })
            .map((item, index) => {
              let date = new Date(item.createdAt);
              let minute = date.getMinutes();
              let hours = date.getHours();
              return (
                <div className="card col-md-3 col-10 m-3" key={index}>
                  <div className="cardHeader">
                    <h1 className="text-center text-light m-2">
                      <i className="bi bi-cart-check"> </i>
                    </h1>
                    <div className="d-flex justify-content-around">
                      <div className="cardBox">
                        <i className="bi bi-calendar-date text-primary"></i>
                        {" " + item.createdAt.substring(0, 10)}
                      </div>
                      <div className="cardBox">
                        <i className="bi bi-clock text-primary"></i>
                        {` ${hours} : ${minute}`}
                      </div>
                    </div>
                  </div>

                  <div className="cardBody">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.productList.map((item1, index1) => (
                          <tr key={index1}>
                            <td>{index1 + 1}</td>
                            <td>{item1.product.productName.length > 20
                          ? `${item1.product.productName.substr(0, 20)}...`
                          : item1.product.productName}</td>
                            <td>{item1.amount}</td>
                            <td>$ {item1.product.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cardFooter d-flex justify-content-between p-3 pb-2">
                    <h6 className="cardFooterBox text-primary">
                      <i className="bi bi-cart4"></i> All products{" "}
                      <b>{item.productList.length}</b>
                    </h6>
                    <h6 className="cardFooterBox text-danger">
                      Total Price ${" "}
                      <b>
                        {item.productList.reduce((a, b) => {
                          a += b.product.price * b.amount;
                          return a;
                        }, 0)}
                      </b>
                    </h6>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default History;
