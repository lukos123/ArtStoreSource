"use client";
import { FC, FormEvent } from "react";
import classes from "./FormCreateProduct.module.scss";
import { useState } from "react";
import { addProduct, editUserImg, setProductImage } from "@/api/api";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/user";
import oip from "./OIP.png";
interface Props {}
const FormCreateProduct: FC<Props> = ({}) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState(oip.src);
  const [price, setPrice] = useState(100);
  const [description, setDescription] = useState("");
  const [massage, setMassage] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { product, err } = await addProduct(name, price, description);
    if (err !== "") {
      setMassage(err);
      return;
    }
    setMassage("Product added");
    setName("");
    setPrice(100);
    setDescription("");
    const img_input: HTMLInputElement | null =
      document.querySelector("#form_file_image");
    let temp;
    if (img_input !== null && img_input.files?.length) {
      temp = await setProductImage(product.id, img_input?.files[0]);
      if (temp?.err !== "") {
        const err = temp?.err;
        setMassage((temp) => {
          return temp + " | " + err;
        });
      }
    }
    if (temp?.image) {
      product.image = temp.image;
    }
    dispatch(userActions.addProduct(product));
    setImg(oip.src);
  };
  return (
    <div className={classes.FormCreateProduct}>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="form_file_image">
          <img width={300} src={img} alt="img" />
        </label>
        <input
          onChange={(e) => {
            if (!e.target.files?.length) return;
            const file = e.target.files[0];
            file ? setImg(URL.createObjectURL(file)) : "";
          }}
          hidden
          required
          type="file"
          id="form_file_image"
        />
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="price">Price</label>
        <input
          required
          type="number"
          value={price}
          id="price"
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {massage}
        <br />
        <br />
        <input required type="submit" value={"ADD"} />
      </form>
    </div>
  );
};

export default FormCreateProduct;
