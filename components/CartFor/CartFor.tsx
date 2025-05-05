"use client";
import { FC } from "react";
import classes from "./CartFor.module.scss";
import { CartItemGroup } from "@/types/types";
import { finishOrderBySupplier, getUrl } from "@/api/api";

interface Props {
  cart: CartItemGroup;
  isYour?: boolean;
}
const CartFor: FC<Props> = ({ cart, isYour = false }) => {
  return (
    <div className={classes.CartFor}>
      {cart.cart_items.map((cart_item) => {
        return (
          <div key={cart_item.id} className={classes.cart_item}>
            <h3>
              <img src={getUrl(cart_item.product.image)} alt="img" />
              {cart_item.name}
            </h3>
            <span>{cart_item.status}</span>
            <span>{cart_item.quantity} item</span>
            <span>{cart_item.product.price * cart_item.quantity}$</span>
          </div>
        );
      })}
    </div>
  );
};

export default CartFor;
