import { addProduct } from "@/api/api";
import {
  CartItem,
  CartItemGroup,
  Comment,
  Notification,
  Order,
  Product,
  User,
} from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState extends User {}

const state: userState = {
  id: -1,
  username: "none",
  description: "none",
  email: "none",
  logo: "none",
  products: [],
  comments: [],
  orders: [],
  notifications: [],
  cart_item_groups: [],
};

const userReducer = createSlice({
  name: "user",
  initialState: state,
  reducers: {
    // plus(state, action: PayloadAction<number>) {
    //   state.num += action.payload;
    // },
    edit(state, action: PayloadAction<User>) {
      state.cart_item_groups = action.payload.cart_item_groups;
      state.comments = action.payload.comments;
      state.description = action.payload.description;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.notifications = action.payload.notifications;
      state.orders = action.payload.orders;
      state.username = action.payload.username;
      state.products = action.payload.products;
      state.logo = action.payload.logo;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setLogo(state, action: PayloadAction<string>) {
      state.logo = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    setProduct(state, action: PayloadAction<Product>) {
      state.products.forEach((product, id) => {
        if (action.payload.id == product.id) {
          state.products[id] = action.payload;
        }
      });
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      for (const i of state.cart_item_groups) {
        if (i.main) {
          let find = false;
          for (const item of i.cart_items) {
            if (item.id == action.payload.id) {
              item.quantity++;
              find = true;
              break;
            }
          }

          if (!find) {
            i.cart_items.push(action.payload);
          }

          break;
        }
      }
    },
    editCartItem(state, action: PayloadAction<CartItem>) {
      for (const cart of state.cart_item_groups) {
        if (cart.main) {
          let find = false;

          cart.cart_items.forEach((item, id) => {
            if (item.id == action.payload.id) {
              cart.cart_items[id] = action.payload;
            }
          });

          break;
        }
      }
    },
    deleteCartItem(state, action: PayloadAction<number>) {
      state.cart_item_groups
        .find((i) => i.main)
        ?.cart_items.forEach((it, id, arr) => {
          if (it.id == action.payload) arr.splice(id, 1);
          console.log(it);
        });
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products.find((it, id, arr) => {
        if (it.id == action.payload) {
          arr.splice(id, 1);
        }
        return it.id == action.payload;
      });
    },
    setCarts(state, action: PayloadAction<CartItemGroup[]>) {
      state.cart_item_groups = action.payload;
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
  },
});
export const userActions = userReducer.actions;
export default userReducer;
