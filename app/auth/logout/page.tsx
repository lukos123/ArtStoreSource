"use client";
import { FC, useEffect } from "react";
// import classes from "@/styles/page.module.scss";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@/store/auth";
import { userActions } from "@/store/user";
import { logout } from "@/api/api";
import { useRouter } from "next/navigation";
const Page = ({}) => {
  const dispatch = useDispatch();

  // dispatch(userActions.)
  const router = useRouter();
  useEffect(() => {
    dispatch(authActions.authFalse());
    logout();

    router.push("/");
  }, []);
  return <div></div>;
};

export default Page;
