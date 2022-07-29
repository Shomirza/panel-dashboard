import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Orders from "./Pages/Orders/Orders";
import Products from "./Pages/Products/Products";
import History from "./Pages/History/History";
import Create from "./Pages/Create/Create";
import Cart from "./Pages/Cart/cart";
import Login from "./Pages/Login/Login";
import useLocalStorage from "use-local-storage";

function App() {
  const { pathname } = useLocation();
  const [log, setLog] = useLocalStorage("lock", "false");

  function Exit() {
    setLog("true");
  }

  return (
    <>
      {log === "true" ? (
        <Login setLog={setLog} />
      ) : (
        <div className="d-flex block ">
          <div
            className={`sidebar  justify-content-between flex-column ${
              pathname === "/login" ? "d-none" : ""
            }`}
          >
            <div>
              <h4 className="text-center fw-bolder">Site Logo</h4>
              <NavLink to={"/"}>
                <h6
                  className={` p-4 pt-1 pb-1 ${
                    pathname === "/" ? "active" : ""
                  } `}
                >
                  <i className="bi bi-grid-fill"></i> Dashboard{" "}
                </h6>
              </NavLink>
              <NavLink to={"/orders"}>
                <h6
                  className={` p-4 pt-1 pb-1 ${
                    pathname === "/orders" ? "active" : ""
                  } `}
                >
                  <i className="bi bi-cart-fill"></i> Orders
                </h6>
              </NavLink>
              <NavLink to={"/products"}>
                <h6
                  className={` p-4 pt-1 pb-1 ${
                    pathname === "/products" ? "active" : ""
                  } `}
                >
                  <i className="bi bi-bag-fill"></i> Products{" "}
                </h6>
              </NavLink>
              <NavLink to={"/create"}>
                <h6
                  className={` p-4 pt-1 pb-1 ${
                    pathname === "/create" ? "active" : ""
                  } `}
                >
                  <i className="bi bi-plus-square-fill"></i> Create{" "}
                </h6>
              </NavLink>
              <NavLink to={"/history"}>
                <h6
                  className={` p-4 pt-1 pb-1 ${
                    pathname === "/history" ? "active" : ""
                  } `}
                >
                  <i className="bi bi-file-text-fill"></i> History{" "}
                </h6>
              </NavLink>
            </div>

            <a>
              <h6 onClick={Exit} className={`  p-4 pt-1 pb-2 mb-4`}>
              <i className="bi bi-box-arrow-right"></i> Log Out
            </h6>
            </a>
          </div>

          <div
            className={`Mobile ps-2 pe-2 justify-content-between align-items-center ${
              pathname === "/login" ? "d-none" : ""
            }`}
          >
            <NavLink to={"/"}>
              <h6 className={` ${pathname === "/" ? "active" : ""} `}>
                <i className="bi bi-grid-fill"></i>
              </h6>
            </NavLink>
            <NavLink to={"/orders"}>
              <h6 className={` ${pathname === "/orders" ? "active" : ""} `}>
                <i className="bi bi-cart-fill"></i>
              </h6>
            </NavLink>
            <NavLink to={"/products"}>
              <h6 className={` ${pathname === "/products" ? "active" : ""} `}>
                <i className="bi bi-bag-fill"></i>
              </h6>
            </NavLink>
            <NavLink to={"/create"}>
              <h6 className={` ${pathname === "/create" ? "active" : ""} `}>
                <i className="bi bi-plus-square-fill"></i>
              </h6>
            </NavLink>
            <NavLink to={"/history"}>
              <h6 className={` ${pathname === "/history" ? "active" : ""} `}>
                <i className="bi bi-file-text-fill"></i>
              </h6>
            </NavLink>
            <h6 onClick={Exit}>
              <i className="bi bi-box-arrow-right"></i>
            </h6>
          </div>

          <div className="content">
            <Routes>
              <Route path={"/"} element={<Dashboard />} />
              <Route path={"/orders"} element={<Orders />} />
              <Route path={"/products"} element={<Products />} />
              <Route path={"/create"} element={<Create />} />
              <Route path={"/history"} element={<History />} />
              <Route path={"/cart"} element={<Cart />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
