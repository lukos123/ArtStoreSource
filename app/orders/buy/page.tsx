"use client";
import { FC } from "react";
import classes from "./page.module.scss";
import Container from "@/components/Container/Container";
import FormStartOrder from "@/components/FormStartOrder/FormStartOrder";
const Page: FC = ({}) => {
  return (
    <div className={classes.page}>
      <Container>
        <FormStartOrder />
      </Container>
    </div>
  );
};

export default Page;
