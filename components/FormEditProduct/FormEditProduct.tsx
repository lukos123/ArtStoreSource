"use client";
import { FC, FormEvent } from "react";
import classes from "./FormEditProduct.module.scss";
import { useState } from "react";
import {
  addProduct,
  editProduct,
  editUserImg,
  setProductImage,
} from "@/api/api";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/user";
import { Product } from "@/types/types";
interface Props {
  product_for: Product;
  func: () => void;
}
const FormCreateProduct: FC<Props> = ({ product_for, func }) => {
  const [name, setName] = useState(product_for.name);
  const [price, setPrice] = useState(product_for.price);
  const [description, setDescription] = useState(product_for.description);
  const [massage, setMassage] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { product, err } = await editProduct(
      product_for.id,
      name,
      price,
      description
    );
    if (err !== "") {
      setMassage(err);
      return;
    }
    setMassage("Product edited");
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
    dispatch(userActions.setProduct(product));
    func();
  };
  return (
    <form onSubmit={submitHandler} className={classes.FormEditProduct}>
      <input type="file" id="form_file_image" />
      <input
        required
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        required
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(Number(e.target.value));
        }}
      />
      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      {massage}
      <input required type="submit" value={"EDIT"} />
    </form>
  );
};

export default FormCreateProduct;
