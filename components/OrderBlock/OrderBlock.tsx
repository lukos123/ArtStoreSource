"use client";
import { FC } from "react";
import classes from "./OrderBlock.module.scss";
import { Order } from "@/types/types";
import CartFor from "../CartFor/CartFor";
import {
  confirmDeliveryOfOrderByClient,
  finishOrderBySupplier,
  getMainUser,
} from "@/api/api";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/user";
interface Props {
  order: Order;
  isYour?: boolean;
}
const OrderBlock: FC<Props> = ({ order, isYour = false }) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.Order}>
      <h2>status:{order.status}</h2>
      {isYour && order.status === "Wait for send delivery" ? (
        <h3>You must send these goods to the correct address</h3>
      ) : (
        ""
      )}
      <h3>delivery:{order.delivery}</h3>
      <h3>address:{order.delivery_to}</h3>
      <CartFor isYour={isYour} cart={order.cart_group} />
      {isYour && order.status === "Wait for send delivery" ? (
        <button
          onClick={async () => {
            const err = await finishOrderBySupplier(order.id);
            if (err === "") {
              const { user, err } = await getMainUser();
              if (err === "") {
                dispatch(userActions.edit(user));
              }
            }
          }}
        >
          I sent
        </button>
      ) : (
        ""
      )}
      {!isYour && order.status === "All sent" ? (
        <button
          onClick={async () => {
            const err = await confirmDeliveryOfOrderByClient(order.id);
            if (err === "") {
              const { user, err } = await getMainUser();
              if (err === "") {
                dispatch(userActions.edit(user));
              }
            }
          }}
        >
          Confirm
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderBlock;
