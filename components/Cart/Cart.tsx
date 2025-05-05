"use client";
import { FC } from "react";
import classes from "./Cart.module.scss";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import CartItemBlock from "../CartItemBlock/CartItemBlock";
import Link from "next/link";
import { deleteOrder, getMainUser, startOrder } from "@/api/api";
import { userActions } from "@/store/user";
import { useRouter } from "next/navigation";
interface Props {
  close: () => void;
}
const Cart: FC<Props> = ({ close }) => {
  const dispatch = useDispatch();
  const carts = useSelector(
    (state: RootState) => state.userReducer.cart_item_groups
  );
  const not = useSelector((state: RootState) =>
    state.userReducer.orders.find((i) => i.status === "Not Ready")
  );
  const cart = carts.find((i) => {
    return i.main;
  });
  const router = useRouter();
  if (not) {
    return (
      <div className={classes.Cart}>
        <button onClick={() => close()} className={classes.close}>
          <div>+</div>
        </button>
        <div className={classes.info}>
          You should start order or delete order
        </div>
        <Link onClick={close} href={"/orders/buy"} className={classes.buy}>
          START ORDER
        </Link>
        <button
          key={"div"}
          onClick={async () => {
            const err = await deleteOrder();

            if (err === "") {
              const { user, err: err_for_user } = await getMainUser();
              if (err_for_user === "") {
                dispatch(userActions.edit(user));
              }
            }
          }}
          className={[classes.buy, classes.delete].join(" ")}
        >
          DELETE ORDER
        </button>
      </div>
    );
  }
  if (cart) {
    let quantity_products = 0;
    let all_price = 0;
    cart.cart_items.forEach((i) => {
      quantity_products += i.quantity;
      all_price += i.quantity * i.product.price;
    });
    return (
      <div className={classes.Cart}>
        <button onClick={() => close()} className={classes.close}>
          <div>+</div>
        </button>
        <div className={classes.info}>
          Quantity Products: {quantity_products}
        </div>
        <div className={classes.info}>
          All Price: <span className={classes.bold}>{all_price}$</span>
        </div>
        {cart && cart.cart_items.length
          ? cart.cart_items.map((cart_item) => (
              <CartItemBlock key={cart_item.id} cart_item={cart_item} />
            ))
          : "0 items"}
        {cart && cart.cart_items.length ? (
          <button
            onClick={async () => {
              const err = await startOrder();
              if (err === "") {
                const { user, err: err_for_user } = await getMainUser();
                if (err_for_user === "") {
                  dispatch(userActions.edit(user));
                  router.push("/orders/buy");
                } else {
                  console.log("err_for_user: " + err_for_user);
                }
              } else {
                console.log("err: " + err);
              }
              close();
            }}
            className={classes.buy}
          >
            BUY
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default Cart;
