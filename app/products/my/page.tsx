"use client";
import { FC } from "react";
import classes from "./page.module.scss";
import { useState, useEffect } from "react";
import { Product } from "@/types/types";
import { getAllProducts, getMainUser, getUrl } from "@/api/api";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import Container from "@/components/Container/Container";
import ProductItem from "@/components/ProductItem/ProductItem";
import Control from "@/components/Control/Control";
import { userActions } from "@/store/user";
const Page: FC = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [sortTo, setSortTo] = useState(false);
  const products_r = useSelector(
    (state: RootState) => state.userReducer.products
  );
  useEffect(() => {
    (async () => {
      const { user: user, err } = await getMainUser();
      if (err !== "") {
        console.log(err);

        return;
      }
      dispatch(userActions.edit(user));
      setProducts(user.products);
      setSort("name");
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setProducts(products_r);
      setSort("name");
    })();
  }, [products_r]);
  return (
    <Container>
      <Control
        products={products}
        setProducts={setProducts}
        setSort={setSort}
        setSortTo={setSortTo}
        sort={sort}
        sortTo={sortTo}
        isMy
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
