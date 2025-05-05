"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import Container from "@/components/Container/Container";
import { useEffect } from "react";
import { RootState } from "@/store/app";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/user";
import { useState } from "react";
import { Product } from "@/types/types";
export default function Home() {
  // const dispatch = useDispatch();
  // const num = useSelector((state: RootState) => state.);
  // const dispatch = useDispatch();

  // const [products, setProducts] = useState<Product[]>([]);
  // const user = useSelector((state: RootState) => state.userReducer);
  return (
    <main className={styles.main}>
      <Container>
        <h1>Welcome</h1>
      </Container>
    </main>
  );
}
