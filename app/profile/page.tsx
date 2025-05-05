"use client";
import { FC, useEffect } from "react";
import classes from "./page.module.scss";
import Container from "@/components/Container/Container";
import FormEditProfile from "@/components/FormEditProfile/FormEditProfile";
// import Head from "next/head";
import type { Metadata, ResolvingMetadata } from "next";
import { getUser } from "@/api/api";
// import { Props } from "next/dist/client/script";
// import { Props } from "next/script";
// export const metadata = {
//   title: "My profile",
// };

const Page: FC = ({}) => {
  return (
    <Container>
      <FormEditProfile />
    </Container>
  );
};

export default Page;
