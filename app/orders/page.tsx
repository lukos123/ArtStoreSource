"use client";
import { FC, useEffect } from "react";
import classes from "./page.module.scss";
import { getAllOrders, getCarts } from "@/api/api";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/user";
import Container from "@/components/Container/Container";
import CartFor from "@/components/CartFor/CartFor";
import OrderBlock from "@/components/OrderBlock/OrderBlock";
const Page: FC = ({}) => {
  const orders = useSelector((state: RootState) => state.userReducer.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { orders: taken_orders, err } = await getAllOrders();
      if (err === "") {
        dispatch(userActions.setOrders(taken_orders));
      }
    })();
  }, []);
  return (
    <div className={classes.page}>
      <Container class_for={classes.container}>
        {orders.length
          ? orders.map((order) => {
              return <OrderBlock key={order.id} order={order} />;
            })
          : "0 orders"}
      </Container>
    </div>
  );
};

export default Page;
