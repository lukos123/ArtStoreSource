"use client";
import { FC, useEffect, useState } from "react";
import classes from "./FormStartOrder.module.scss";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { Order } from "@/types/types";
import { useRouter } from "next/navigation";
import { finishOrderByClient, getAllOrders, getAllProducts } from "@/api/api";
import { userActions } from "@/store/user";
interface Props {}
const FormStartOrder: FC<Props> = ({}) => {
  const orders = useSelector((state: RootState) => state.userReducer.orders);
  const router = useRouter();
  const [order, setOrder] = useState<Order>();
  const [delivery, setDelivery] = useState<string>("");
  const [deliveryTo, setDeliveryTo] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders) {
      const order_in = orders.find((i) => i.status === "Not Ready");
      if (order_in) {
        setDelivery(order_in.delivery);
      } else {
        router.push("/orders");
      }
      setOrder(order_in);
    }
  }, [orders]);
  return (
    <form
      className={classes.FormStartOrder}
      onSubmit={async (e) => {
        e.preventDefault();
        if (delivery !== "" && deliveryTo !== "" && order) {
          const err = await finishOrderByClient(order.id, delivery, deliveryTo);
          if (err === "") {
            const { orders, err: err_for } = await getAllOrders();
            if (err_for === "") {
              dispatch(userActions.setOrders(orders));
            }
          }
        }
      }}
    >
      <label htmlFor="delivery">delivery:</label>
      <input
        required
        type="text"
        id="delivery"
        value={delivery}
        onChange={(e) => setDelivery(e.target.value)}
      />
      <label htmlFor="deliveryTo">address:</label>
      <input
        required
        type="text"
        id="deliveryTo"
        value={deliveryTo}
        onChange={(e) => setDeliveryTo(e.target.value)}
      />
      <input required type="submit" value={"START ORDER"} />
    </form>
  );
};

export default FormStartOrder;
