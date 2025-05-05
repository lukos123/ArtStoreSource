"use client";
import { FC, PropsWithChildren } from "react";
import classes from "./Container.module.scss";

interface Props {
  class_for?: string;
}
const Container: FC<PropsWithChildren<Props>> = ({ class_for, children }) => {
  return <div className={classes.Container + " " + class_for}>{children}</div>;
};

export default Container;
