import React, { useState, useEffect } from "react";

function Cart({ state, dispatch }) {
  const { cart } = state;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr?.qty) * curr?.price, 0)
    );
  }, [cart]);

  const changeQty = (id, qty) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id,
        qty,
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10",
        background: "#ececec",
        padding: 10,
        width: "20%",
      }}
    >
      <b style={{ fontSize: "30px", alignSelf: "center" }}>Cart</b>
      <b style={{ fontSize: "30px", alignSelf: "center" }}>
        Subtotal: ${total}
      </b>
      {cart.length > 0 ? (
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          {cart.map((el) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
                border: "1px solid grey",
                margin: 5,
              }}
              key={el.id}
            >
              <img
                src={el?.thumbnail}
                alt={el?.title}
                style={{ width: 100, objectFit: "cover" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{el?.title}</span>
                <b>${el?.price}</b>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => changeQty(el?.id, el.qty - 1)}>-</button>
                <span>{el?.qty}</span>
                <button onClick={() => changeQty(el?.id, el.qty + 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Cart is Empty</div>
      )}
      {/* Cart */}
    </div>
  );
}

export default Cart;
