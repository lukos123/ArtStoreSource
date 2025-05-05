"use client";
import { FC, useEffect } from "react";
import classes from "./page.module.scss";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderNotification } from "@/api/api";
import { userActions } from "@/store/user";
import Container from "@/components/Container/Container";
import NotificationBlock from "@/components/NotificationBlock/NotificationBlock";
const Page: FC = ({}) => {
  const notifications = useSelector(
    (state: RootState) => state.userReducer.notifications
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { notifications: taken_notifications, err } =
        await getAllOrderNotification();
      if (err === "") {
        dispatch(userActions.setNotifications(taken_notifications));
      } else console.log(err);
    })();
  }, []);
  return (
    <div>
      <Container class_for={classes.page}>
        {notifications.length > 0
          ? notifications.map((i) => {
              return <NotificationBlock notification={i} key={i.id} />;
            })
          : "0 notifications"}
      </Container>
    </div>
  );
};

export default Page;
