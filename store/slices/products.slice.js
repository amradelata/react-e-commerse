import { createSlice } from "@reduxjs/toolkit";

export const ProdcutsSlice = createSlice({
  name: "products",
  initialState: {
    productsArr: [],
  },
  reducers: {
    setProductsValue(state, { payload }) {
      state.productsArr = payload;
    },
  },
});

export const { setProductsValue } = ProdcutsSlice.actions;

export const getProdcutsData = () => async (dispatch) => {
  const data = await fetch(
    "https://vue-e-commerce-databse.herokuapp.com/products"
  ).then((res) => res.json());

  dispatch(setProductsValue(data));
};

export default ProdcutsSlice.reducer;
