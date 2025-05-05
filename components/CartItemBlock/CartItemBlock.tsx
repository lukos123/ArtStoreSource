"use client";
import { FC } from "react";
import classes from "./CartItemBlock.module.scss";
import { CartItem } from "@/types/types";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/user";
import { deleteCartItem, editCartItem } from "@/api/api";
interface Props {
  cart_item: CartItem;
}
const CartItemBlock: FC<Props> = ({ cart_item }) => {
  const dispatch = useDispatch();
  const plus = () => {
    (async () => {
      const { cart_item: taken_cart_item, err } = await editCartItem(
        cart_item.id,
        cart_item.quantity + 1
      );
      if (err === "") dispatch(userActions.editCartItem(taken_cart_item));
    })();
  };
  const delete_fn = () => {
    (async () => {
      const err = await deleteCartItem(cart_item.id);
      if (err === "") {
        dispatch(userActions.deleteCartItem(cart_item.id));
      }
    })();
  };
  const minus = () => {
    (async () => {
      if (cart_item.quantity <= 1) {
        delete_fn();
      } else {
        const { cart_item: taken_cart_item, err } = await editCartItem(
          cart_item.id,
          cart_item.quantity - 1
        );
        if (err === "") dispatch(userActions.editCartItem(taken_cart_item));
      }
    })();
  };
  return (
    <div className={classes.CartItemBlock}>
      <div className={classes.name}>
        {cart_item.name}{" "}
        <span className={classes.bold}>
          {cart_item.product.price * cart_item.quantity}$
        </span>
      </div>
      <div className={classes.counter}>
        <button onClick={minus}>-</button>
        {cart_item.quantity}
        <button onClick={plus}>+</button>
      </div>
      <div className={classes.delete}>
        <button onClick={delete_fn}>del</button>
      </div>
    </div>
  );
};

export default CartItemBlock;
