"use client";
import { FC } from "react";
import classes from "./NotificationBlock.module.scss";
import { Notification } from "@/types/types";
import OrderBlock from "../OrderBlock/OrderBlock";

interface Props {
  notification: Notification;
}
const NotificationBlock: FC<Props> = ({ notification }) => {
  return (
    <div className={classes.NotificationBlock}>
      <OrderBlock isYour order={notification.order} />
    </div>
  );
};

export default NotificationBlock;
