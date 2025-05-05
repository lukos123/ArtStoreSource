"use client";
import { FC, useRef, useState } from "react";
import classes from "./ProductItem.module.scss";
import { Product } from "@/types/types";
import { getUrl } from "@/api/api";
import Link from "next/link";
import useObserver from "@/hooks/useObserver";

interface Props {
  product: Product;
}
const ProductItem: FC<Props> = ({ product }) => {
  const [url, setUrl] = useState("");
  const el = useRef(null);
  const obs = useObserver(el, (_, obs) => {
    const temp = getUrl(product.image);
    temp ? setUrl(temp) : "";
    obs.disconnect();
  });
  return (
    <Link
      ref={el}
      href={`/products/${product.id}`}
      className={classes.ProductItem}
    >
      <div className={classes.image}>
        {url ? <img src={url} alt="image" /> : <div></div>}
      </div>
      <div className={classes.info}>
        <h3>{product.name}</h3>
        <h2>{new Date(product.created_at).toLocaleDateString()} </h2>
        <span>{product.price}$</span>
        <p>{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
