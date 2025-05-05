"use client";
import { FC, FormEvent, FormEventHandler, useState } from "react";
import classes from "./page.module.scss";
import Container from "@/components/Container/Container";
import { PasswordIsSmall, register } from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/app";
import { authActions } from "@/store/auth";
import { redirect, useRouter } from "next/navigation";
const Page: FC = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.authReducer.auth);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();
  if (auth) {
    router.push("/products");
  }
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == passwordAgain && password.length > 0) {
      const err = await register(username, email, password);
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
    } else {
      setMassage("Passwords not equal");
    }
  };
  return (
    <Container>
      <form className={classes.page} onSubmit={submit}>
        <div className={classes.input_div}>
          <label htmlFor="username">USERNAME</label>
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
          <label htmlFor="email">EMAIL</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(i) => {
              setEmail(i.target.value);
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
          <label htmlFor="passwordAgain">PASSWORD AGAIN</label>
          <input
            required
            type="password"
            id="passwordAgain"
            value={passwordAgain}
            onChange={(i) => {
              setPasswordAgain(i.target.value);
            }}
          />
        </div>
        <div className={classes.input_div}>
          <label>{massage}</label>
          <input required type="submit" value={"REGISTER"} />
        </div>
      </form>
    </Container>
  );
};

export default Page;
