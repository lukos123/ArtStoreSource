"use client";
import { FC } from "react";
import classes from "./page.module.scss";
import { useState, useEffect } from "react";
import { Product } from "@/types/types";
import { getAllProducts, getUrl } from "@/api/api";
import Container from "@/components/Container/Container";
import ProductItem from "@/components/ProductItem/ProductItem";
import Link from "next/link";
import Control from "@/components/Control/Control";
// import { metadata } from "../layout";

const Page: FC = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("");
  const [sortTo, setSortTo] = useState(false);
  useEffect(() => {
    (async () => {
      const { products: taken_products, err } = await getAllProducts();
      if (err !== "") {
        console.log(err);

        return;
      }
      setProducts(taken_products);
      setSort("name");
    })();
  }, []);

  return (
    <Container class_for={classes.container}>
      <Control
        products={products}
        setProducts={setProducts}
        setSort={setSort}
        setSortTo={setSortTo}
        sort={sort}
        sortTo={sortTo}
      />
      <div className={classes.products}>
        {products.length > 0
          ? products.map((product) => {
              return <ProductItem product={product} key={product.id} />;
            })
          : "0 Products"}
      </div>
    </Container>
  );
};

export default Page;
