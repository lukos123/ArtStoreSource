"use client";
import { FC } from "react";
import classes from "./NotiSVG.module.scss";
import svg from "./notification-svgrepo-com.svg";
interface Props {}
const NotiSVG: FC<Props> = ({}) => {
  return <img className={classes.NotiSVG} src={svg.src} />;
};

export default NotiSVG;
