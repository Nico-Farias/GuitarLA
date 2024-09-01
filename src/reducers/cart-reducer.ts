import { db } from "../db/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions =
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "remove-cart"; payload: { id: Guitar["id"] } }
  | { type: "decrementar-qty"; payload: { id: Guitar["id"] } }
  | { type: "incrementar-qty"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};
export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MAXT_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (
  state: CartState = initialState,
  actions: CartActions
) => {
  if (actions.type === "add-to-cart") {
    const itemExiste = state.cart.find(
      (guitar) => guitar.id === actions.payload.item.id
    );

    let updateCart: CartItem[] = [];

    if (itemExiste) {
      updateCart = state.cart.map((item) => {
        if (item.id === actions.payload.item.id) {
          if (item.cantidad < MAXT_ITEMS) {
            return { ...item, cantidad: item.cantidad + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = { ...actions.payload.item, cantidad: 1 };

      updateCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updateCart,
    };
  }
  if (actions.type === "remove-cart") {
    const carritoActualizado = state.cart.filter(
      (cart) => cart.id !== actions.payload.id
    );

    return {
      ...state,
      cart: carritoActualizado,
    };
  }
  if (actions.type === "decrementar-qty") {
    const updateCart = state.cart.map((item) => {
      if (item.id === actions.payload.id && item.cantidad > MIN_ITEMS) {
        return {
          ...item,
          cantidad: item.cantidad - 1,
        };
      }

      return item;
    });

    return {
      ...state,
      cart: updateCart,
    };
  }
  if (actions.type === "incrementar-qty") {
    const updateCart = state.cart.map((item) => {
      if (item.id === actions.payload.id && item.cantidad < MAXT_ITEMS) {
        return {
          ...item,
          cantidad: item.cantidad + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updateCart,
    };
  }

  if (actions.type === "clear-cart")
    return {
      ...state,
      cart: [],
    };
};
