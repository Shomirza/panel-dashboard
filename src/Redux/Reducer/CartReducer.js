import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },

  reducers: {
    CartAdd: (state, action) => {
      let item = {
        productId: action.payload.id,
        imageId: action.payload.imageId,
        productName: action.payload.productName,
        amount: 1,
        price: action.payload.price,
      };
      state.cart.push(item);
    },

    CartSplice: (state, action) => {
      state.cart.map((item, index) => {
        if (item.productId === action.payload.id) {
          state.cart.splice(index, 1);
        }
      });
    },

    Input: (state, action) => {
      state.cart.map((item, index) => {
        if (item.productId === action.payload.id) {
          state.cart[index].amount = parseInt(action.payload.amount);
          if (item.amount === 0) {
            state.cart.splice(index, 1);
          }
        }
      });
    },

    CartDelete: (state, action) => {
      state.cart.map((item, index) => {
        if (item.productId === action.payload.productId) {
          state.cart.splice(index, 1);
        }
      });
    },

    Clear: (state, action) => {
      state.cart = [];
    },
  },
});

export function PushCart(data) {
  return (dispatch) => {
    dispatch({
      type: CartAdd.type,
      payload: data,
    });
  };
}
export function PullCart(data) {
  return (dispatch) => {
    dispatch({
      type: CartSplice.type,
      payload: data,
    });
  };
}
export function DeleteCart(data) {
  return (dispatch) => {
    dispatch({
      type: CartDelete.type,
      payload: data,
    });
  };
}
export function InputCart(data) {
  return (dispatch) => {
    dispatch({
      type: Input.type,
      payload: data,
    });
  };
}
export function ClearCart(data) {
  return (dispatch) => {
    dispatch({
      type: Clear.type,
      payload: data,
    });
  };
}
export function Checkout(data) {
  return (dispatch) => {
    axios({
      url: "https://store-management-backend-app.herokuapp.com/api/v1/sale/sold",
      method: "POST",
      data,
    })
      .then((res) => {
        dispatch({
          type: Clear.type,
          payload: res.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
}

export const { CartAdd, CartSplice, CartDelete, Input, Clear } =
  CartReducer.actions;
export default CartReducer.reducer;
