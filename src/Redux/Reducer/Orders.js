import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";



// const dispatch = useDispatch()
export function GetProduct() {
  return (dispatch) => {
    axios({
      url: "https://store-management-backend-app.herokuapp.com/api/v1/product",
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: GetProducts.type,
          payload: res.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}

export function AddProduct(data) {
  return (dispatch) => {
    axios({
      url: "https://store-management-backend-app.herokuapp.com/api/v1/product",
      method: "POST",
      data,
    })
      .then((res) => {
        dispatch({
          type: AddProducts.type,
          payload: res.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
export function DeleteProduct(id) {
  return (dispatch) => {
    axios({
      url: `https://store-management-backend-app.herokuapp.com/api/v1/product/${id}`,
      method: "DELETE",
    })
      .then((res) => {
        dispatch({
          type: DeleteProducts.type,
          payload: id,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
export function EditProduct(data) {
  return (dispatch) => {
    axios({
      url: `https://store-management-backend-app.herokuapp.com/api/v1/product/${data.id}`,
      method: "PUT",
      data,
    })
      .then((res) => {
        dispatch(GetProduct())
      })
      .catch((err) => {
        alert(err);
      });
  };
}

const slice = createSlice({
  name: "Product",
  initialState: {
    Product: [],
    PieCharts: null,
  },
  reducers: {
    GetProducts: (state, action) => {
      state.Product = action.payload.sort((a, b) => (a.id > b.id ? -1 : 1));

      const category = action.payload.map((item) => {
        if (item.category !== state.Product.map((item1) => item1.category)) {
          return item;
        }
      });

      const as = category.filter((item) => {
        const q = 0;
        if (item.category !== null && item.amount !== q) {
          return item;
        }
      });

      state.PieCharts = [
        ["Task", "Hours per Day"],
        ...as.map((item) => [item.category, item.amount]),
      ];
    },

    AddProducts: (state, action) => {
      state.Product.unshift(action.payload);
    },

    DeleteProducts: (state, action) => {
      state.Product.map((item, index) => {
        if (item.id == action.payload) {
          state.Product.splice(index, 1);
        }
      });
    },
    EditProducts: (state, action) => {
      /* state.Product.map((item) => {
        if (item.id == action.payload.id) {
          item.id = action.payload.id;
          item.imageId = action.payload.imageId;
          item.productName = action.payload.productName;
          item.description = action.payload.description;
          item.amount = action.payload.amount;
          item.price = action.payload.price;
        }
      }); */
    },
  },
});

export const { GetProducts, AddProducts, DeleteProducts, EditProducts } =
  slice.actions;
export default slice.reducer;
