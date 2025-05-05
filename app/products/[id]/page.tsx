// "use client";
import { FC, useEffect, useState } from "react";
import classes from "./page.module.scss";
import { Product, UserProfile } from "@/types/types";
import { getAllProducts } from "@/api/api";
import ProductPage from "@/components/ProductPage/ProductPage";

// export async function generateStaticParams() {
//   // Здесь нужно указать все возможные значения параметра id
//   const arr = [];
//   for (let i = 0; i < 500; i++) {
//     arr.push({ id: i.toString() });
//   }
//   return arr;
// }

const Page = ({ params }: { params: { id: string } }) => {
  return <ProductPage params={params} />;
};

export default Page;
