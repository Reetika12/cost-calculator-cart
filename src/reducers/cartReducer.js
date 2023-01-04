export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [{ ...action.payload }, ...state.cart],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((el) =>
          el.id === action.payload.id ? (el.qty = action.payload.qty) : el.qty
        ),
      };
    default:
      break;
  }
};
