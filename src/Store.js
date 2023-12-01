import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,

  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      // store into local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      // remove from cart
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // Update Cart in local Storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CLEAR_CART": {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }
    case "ADMIN_SIGNIN": {
      return { ...state, adminInfo: action.payload };
    }
    case "ADMIN_SIGNOUT": {
      return {
        ...state,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
        adminInfo: null,
      };
    }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
