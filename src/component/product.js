import React from "react";

function Product({ state, dispatch }) {
  console.log("state", state);
  const { products, cart } = state;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "80%",
      }}
    >
      {products.map((el) => (
        <div
          key={el?.id}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
            border: "1px solid grey",
            width: "30%",
            marginTop: "10px",
            gap: 10,
          }}
        >
          <img
            src={el?.thumbnail}
            alt={el?.title}
            style={{ height: 200, objectFit: "cover" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{el?.title}</span>
            <b>${el?.price}</b>
          </div>
          {cart.some((p) => p.id === el.id) ? (
            <button
              style={{
                padding: 5,
                border: 0,
                borderRadius: "5px",
                background: "#e53935",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: {
                    id: el.id,
                  },
                });
              }}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              style={{
                padding: 5,
                border: 0,
                borderRadius: "5px",
                background: "green",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    id: el.id,
                    title: el?.title,
                    thumbnail: el?.thumbnail,
                    qty: 1,
                    price: el?.price,
                  },
                });
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Product;
