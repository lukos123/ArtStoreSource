"use client";
import { FC } from "react";
import classes from "./page.module.scss";
import { useState, useEffect } from "react";
import { Product } from "@/types/types";
import { getAllProducts } from "@/api/api";
import Container from "@/components/Container/Container";
import FormCreateProduct from "@/components/FormCreateProduct/FormCreateProduct";
const Page: FC = ({}) => {
  return (
    <div className={classes.page}>
      <Container>
        <FormCreateProduct />
      </Container>
    </div>
  );
};

export default Page;
