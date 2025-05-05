"use client";
import { FC, useEffect, useState } from "react";
import classes from "./Header.module.scss";
import Link from "next/link";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import Container from "./Container/Container";
import { userActions } from "@/store/user";
import { AccessTokenNotFound, getMainUser, getUrl, refresh } from "@/api/api";
import { authActions } from "@/store/auth";
import Cart from "./Cart/Cart";
import CartSVG from "./CartSVG/CartSVG";
import NotiSVG from "./NotiSVG/NotiSVG";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { CartItem, Notification, Order } from "@/types/types";

interface Props {}
const Header: FC<Props> = ({}) => {
  const auth = useSelector((state: RootState) => state.authReducer.auth);
  const logo = useSelector((state: RootState) => state.userReducer.logo);
  const _orders = useSelector((state: RootState) => state.userReducer.orders);
  const cart_item_groups = useSelector(
    (state: RootState) => state.userReducer.cart_item_groups
  );
  const _notifications = useSelector(
    (state: RootState) => state.userReducer.notifications
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart_items, setCart_items] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    cart_item_groups.forEach((i) => {
      if (i.main) {
        setCart_items(i.cart_items);
      }
    });
  }, [cart_item_groups]);
  useEffect(() => {
    const temp_arr: Notification[] = [];
    _notifications.forEach((i) => {
      if (i.order.status !== "All made") {
        temp_arr.push(i);
      }
    });
    setNotifications(temp_arr);
  }, [_notifications]);
  useEffect(() => {
    const temp_arr: Order[] = [];
    _orders.forEach((i) => {
      const arr: number[] = [];
      if (i.status !== "All made") {
        if (!arr.find((e) => e === i.cart_item_group_id)) {
          arr.push(i.cart_item_group_id);
          temp_arr.push(i);
        }
      }
    });
    setOrders(temp_arr);
  }, [_orders]);

  // const router = useRouter();
  // console.log(router.asPath);
  const pathname = usePathname();
  const [cartVisible, setCartVisible] = useState(false);
  const dispatch = useDispatch();
  const updateUser = () => {
    getMainUser().then(({ user, err }) => {
      if (err !== "") {
        refresh().then((err) => {
          if (err !== "") {
            console.log("err ", err);
          } else updateUser();
        });
      } else {
        // alert(user);
        dispatch(userActions.edit(user));
        dispatch(authActions.authTrue());
        // dispatch(userActions.edit(user));
      }
    });
  };
  useEffect(updateUser, []);
  return (
    <header className={classes.header}>
      <Container class_for={classes.container}>
        <div className="logo">
          <Link href={"/"}>
            <img
              width={100}
              src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig/%D0%A2%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D0%B0%D1%80%D0%BA%20IMG%20Worlds%20of%20Adventure%20-%20Klook.jpg"
              alt="asd"
            />
          </Link>
        </div>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link
                className={pathname == "/products" ? classes.active : ""}
                href="/products"
              >
                Products
              </Link>
            </li>

            {auth ? (
              <>
                <li>
                  <Link
                    className={pathname == "/orders" ? classes.active : ""}
                    href="/orders"
                  >
                    Your Orders
                    {orders.length > 0 ? (
                      <div className={classes.number}>{orders.length}</div>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      pathname == "/orders/notification" ? classes.active : ""
                    }
                    href="/orders/notification"
                  >
                    <NotiSVG />
                    {notifications.length > 0 ? (
                      <div className={classes.number}>
                        {notifications.length}
                      </div>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
                <li style={{ position: "relative" }}>
                  <button
                    className={classes.cart_link}
                    onClick={() => setCartVisible((prev) => !prev)}
                  >
                    <CartSVG />
                    {cart_items.length > 0 ? (
                      <div className={classes.number}>{cart_items.length}</div>
                    ) : (
                      ""
                    )}
                  </button>
                  {/* {cartVisible} */}
                  {cartVisible ? (
                    <Cart close={() => setCartVisible(false)} />
                  ) : (
                    ""
                  )}
                </li>
                <li>
                  <Link href="/profile">
                    <img height={50} src={getUrl(logo)} alt="" />
                  </Link>
                </li>

                {/* <Link href="//auth/logout">Logout</Link> */}
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/register">Register</Link>
                </li>
                <li>
                  <Link href="/auth/login">Login</Link>
                </li>
              </>
            )}
            <li></li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
