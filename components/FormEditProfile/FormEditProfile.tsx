"use client";
import { FC, useEffect } from "react";
import classes from "./FormEditProfile.module.scss";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import Container from "@/components/Container/Container";
import { useState } from "react";
import { editUser, editUserImg, getUrl, refresh } from "@/api/api";
import { userActions } from "@/store/user";
interface Props {}
const FormEditProfile: FC<Props> = ({}) => {
  const user_id = useSelector((state: RootState) => state.userReducer.id);
  const user_logo = useSelector((state: RootState) => state.userReducer.logo);
  const user_username = useSelector(
    (state: RootState) => state.userReducer.username
  );
  const user_email = useSelector((state: RootState) => state.userReducer.email);
  const user_description = useSelector(
    (state: RootState) => state.userReducer.description
  );
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [massage, setMassage] = useState("");
  const [logo, setLogo] = useState("");
  const [username, setUsername] = useState("user.username");
  const [email, setEmail] = useState("user.email");
  const [description, setDescription] = useState("user.description");
  useEffect(() => {
    const temp_logo = getUrl(user_logo);
    temp_logo ? setLogo(temp_logo) : "";
    setUsername(user_username);
    setEmail(user_email);
    setDescription(user_description);
  }, [user_username, user_email, user_description, user_logo]);
  return (
    <div className={classes.FormEditProfile}>
      {"id:" + user_id} <br />
      <label htmlFor="username">username:</label>
      <input
        required
        type="text"
        id="username"
        disabled={edit}
        value={username}
        onChange={(i) => setUsername(i.target.value)}
      />
      <br />
      <label htmlFor="email">email:</label>
      <input
        required
        type="text"
        id="email"
        disabled={edit}
        value={email}
        onChange={(i) => setEmail(i.target.value)}
      />
      <br />
      <label htmlFor="description">description:</label>
      <textarea
        required
        id="description"
        disabled={edit}
        value={description}
        onChange={(i) => setDescription(i.target.value)}
      />
      <br />
      <label htmlFor="form_logo">
        <img width={200} src={logo} alt="" />
      </label>
      <input
        hidden
        required
        type="file"
        id="form_logo"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          const file = e.target.files[0];
          file ? setLogo(URL.createObjectURL(file)) : "";
        }}
        disabled={edit}
      />
      {!edit ? (
        <button
          onClick={async () => {
            const file_input: HTMLInputElement | null =
              document.querySelector("#form_logo");

            let temp: {
              logo: string;
              err: string;
            } = {
              logo: "",
              err: "",
            };
            if (file_input !== null && file_input.files?.length)
              temp = await editUserImg(file_input?.files[0]);
            let err: string = temp.err;
            let logo: string = temp.logo;

            if (err !== "") {
              setMassage("img " + err);
              return;
            }
            if (logo) {
              console.log(user_logo);

              dispatch(userActions.setLogo(logo));
            }

            const { user, err: err_ } = await editUser(
              username,
              email,
              description
            );
            if (err_ !== "") {
              setMassage("data " + err_);
              return;
            }
            setMassage("saved ");
            setEdit((p) => {
              return !p;
            });
            dispatch(userActions.edit(user));
          }}
        >
          save
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit((p) => {
              return !p;
            });
          }}
        >
          edit
        </button>
      )}
      {massage}
    </div>
  );
};

export default FormEditProfile;
