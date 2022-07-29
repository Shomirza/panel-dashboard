import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import GetHistory from "../Redux/Reducer/GetHistory";
import Products from "../Redux/Reducer/Orders";
import CartReducer from "./Reducer/CartReducer";

export default configureStore({
  reducer: {
    GetHistory,
    Products,
    CartReducer,
  },
  middleware: [logger, thunk],
});
