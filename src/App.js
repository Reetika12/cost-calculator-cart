import React, { useEffect, useReducer } from "react";
import { cartReducer } from "./reducers/cartReducer";
import axios from "axios";
import "./App.css";
import Product from "./component/product";
import Cart from "./component/cart";
// import TrackVehicle from "./Container/TrackVehicle";
import TrackFile from "./Container/TrackFile";
function App() {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  // console.log("state", state);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let data = await axios.get("https://dummyjson.com/products");
    console.log("dataa++", data);
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data?.data?.products,
    });
    // dispatch({
    //   type: "ADD_PRODUCTS",
    //   payload: data?.data?.products,
    // });
  };

  return (
    <div style={{ display: "flex" }}>
      {/* <TrackVehicle /> */}
      <TrackFile />
      {/* <Product state={state} dispatch={dispatch} />
      <Cart state={state} dispatch={dispatch} /> */}
    </div>
  );
}

export default App;
