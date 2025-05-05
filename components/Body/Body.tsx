"use client";
import { FC, PropsWithChildren } from "react";
import classes from "./Body.module.scss";
import { Provider } from "react-redux";
import Header from "../Header";
import store from "@/store/app";

interface Props {}
const Body: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Provider store={store}>
      <Header />
      <div className={classes.body_this}>{children}</div>
    </Provider>
  );
};

export default Body;
