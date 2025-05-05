"use client";
import { FC } from "react";
import classes from "./CartSVG.module.scss";
import svg from "./cart-shopping-svgrepo-com.svg";
interface Props {}
const CartSVG: FC<Props> = ({}) => {
  return <img className={classes.CartSVG} src={svg.src} />;
};

export default CartSVG;
