// "use client";
import { FC, useState } from "react";
import classes from "./page.module.scss";
import { useEffect } from "react";
import { getUrl, getUser, getUsers } from "@/api/api";
import { UserProfile } from "@/types/types";
import Container from "@/components/Container/Container";
import ProductItem from "@/components/ProductItem/ProductItem";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

// export async function generateStaticParams() {
//   // Здесь нужно указать все возможные значения параметра id
//   const arr = [];
//   for (let i = 0; i < 500; i++) {
//     arr.push({ id: i.toString() });
//   }
//   return arr;
// }

const Page = ({ params }: { params: { id: string } }) => {
  return <ProfilePage params={params} />;
};

export default Page;
