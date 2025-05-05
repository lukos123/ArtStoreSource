"use client";
import { FC, FormEvent, FormEventHandler, useState } from "react";
import classes from "./page.module.scss";
import Container from "@/components/Container/Container";
import { PasswordIsSmall, login, register } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/app";
import { authActions } from "@/store/auth";
import { redirect, useRouter } from "next/navigation";
const Page: FC = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.authReducer.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState("");
  const router = useRouter();
  if (auth) {
    router.push("/products");
  }
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = await login(username, password);
    // NotOK
    // PasswordIsSmall
    // UsernameIsSmall
    // EmailIsNotValid
    // UserAlreadyExist
    if (err !== "") {
      setMassage(err);
    } else {
      dispatch(authActions.authTrue());
    }
  };
  return (
    <Container>
      <form className={classes.page} onSubmit={submit}>
        <div className={classes.input_div}>
          <label htmlFor="username">USERNAME OR EMAIL</label>
          <input
            required
            type="text"
            id="username"
            value={username}
            onChange={(i) => {
              setUsername(i.target.value);
            }}
          />
        </div>

        <div className={classes.input_div}>
          <label htmlFor="password">PASSWORD</label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(i) => {
              setPassword(i.target.value);
            }}
          />
        </div>

        <div className={classes.input_div}>
          <label>{massage}</label>
          <input required type="submit" value={"login"} />
        </div>
      </form>
    </Container>
  );
};

export default Page;
