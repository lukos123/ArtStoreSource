"use client";
import { FC, useEffect, useState } from "react";
import classes from "./ProfilePage.module.scss";
import { UserProfile } from "@/types/types";
import { getUrl, getUser } from "@/api/api";
import ProductItem from "../ProductItem/ProductItem";
import Container from "../Container/Container";

interface Props {
  params: { id: string };
}
const ProfilePage: FC<Props> = ({ params }) => {
  const [user, setUser] = useState<UserProfile>();
  useEffect(() => {
    (async () => {
      const { user_profile, err } = await getUser(Number(params.id));
      if (err === "") {
        setUser(user_profile);
      }
    })();
  }, []);
  if (user)
    return (
      <div>
        <Container class_for={classes.page}>
          <div className={classes.info}>
            <img src={getUrl(user.logo)} alt="logo" />

            <h2>{user.username}</h2>
            <p>{user.description}</p>
          </div>
          <div className={classes.products_box}>
            <h2>Products</h2>
            <div className={classes.products}>
              {user.products.map((product) => {
                return <ProductItem key={product.id} product={product} />;
              })}
            </div>
          </div>
        </Container>
      </div>
    );
};

export default ProfilePage;
