import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'



const slice = createSlice({
    name:'GetHistory',
    
    initialState:{
        history:[],
    },
    reducers:{
        History:(state,action)=>{
            state.history = action.payload;
        }
    }
})

export function getHistory() {
    return (dispatch) => {
    axios({
      url: "https://store-management-backend-app.herokuapp.com/api/v1/sale/history",
      method: "GET",
    }).then((res) => {
      const filter = res.data.filter((item) => {
        if (item.productList.length !== 0) {
          return item;
        }
      });

      const sortedCart = filter.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt));

      dispatch({
        type: History.type,
        payload: sortedCart,
      });
    });
  };
}

export const {History} = slice.actions
export default slice.reducer;