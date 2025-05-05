"use client";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import classes from "./Control.module.scss";
import Link from "next/link";
import { Product } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/app";

interface Props {
  setSortTo: Dispatch<SetStateAction<boolean>>;
  setSort: Dispatch<SetStateAction<string>>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  products: Product[];
  sort: string;
  sortTo: boolean;
  isMy?: boolean;
}
const Control: FC<Props> = ({
  setSortTo,
  setSort,
  sortTo,
  setProducts,
  sort,
  products,
  isMy = false,
}) => {
  const is_log = useSelector((state: RootState) => state.authReducer.auth);
  useEffect(() => {
    if (products.length > 0) {
      if (sort === "name") {
        setProducts((prev) => {
          const arr = [...prev];

          return arr.sort((a, b) => {
            let f = sortTo ? 1 : -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -f;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return f;
            return 0;
          });
        });
      } else if (sort === "price") {
        setProducts((prev) => {
          const arr = [...prev];
          return arr.sort((a, b) => {
            if (sortTo) {
              return a.price - b.price;
            } else {
              return (a.price - b.price) * -1;
            }
          });
        });
      } else if (sort === "created_time") {
        setProducts((prev) => {
          const arr = [...prev];
          return arr.sort((a, b) => {
            const date1 = new Date(a.created_at);
            const date2 = new Date(b.created_at);
            if (sortTo) {
              return date1.getTime() - date2.getTime();
            } else {
              return (date1.getTime() - date2.getTime()) * -1;
            }
          });
        });
      }
    }
  }, [sortTo, sort]);
  return (
    <div className={classes.control}>
      <div className={classes.sort}>
        <span>
          Sort by:
          <select
            defaultValue="name"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="name">name</option>
            <option value="price">price</option>
            <option value="created_time">created time</option>
          </select>
        </span>

        <button
          className={classes.sortTo}
          style={{ userSelect: "none" }}
          onClick={() => {
            setSortTo(!sortTo);
          }}
        >
          {sortTo ? "UP" : "DOWN"}
        </button>
      </div>
      <div className={classes.links}>
        {is_log ? (
          isMy ? (
            <Link href="/products/create">Add Product</Link>
          ) : (
            <Link href="/products/my">My Products</Link>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Control;
