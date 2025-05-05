"use client";
import { FC, useEffect, useState } from "react";
import classes from "./ProductPage.module.scss";
import Container from "../Container/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  addComment,
  deleteProduct,
  getProduct,
  getUrl,
  getUser,
} from "@/api/api";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/app";
import { Product, UserProfile } from "@/types/types";
import { userActions } from "@/store/user";
import FormEditProduct from "../FormEditProduct/FormEditProduct";
import Link from "next/link";
import svg from "@/public/pencil-svgrepo-com.svg";

interface Props {
  params: { id: string };
}
const ProductPage: FC<Props> = ({ params }) => {
  const [product, setProduct] = useState<Product>();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [massage, setMassage] = useState<string>("");
  const [isYour, setIsYour] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isAuth = useSelector((state: RootState) => state.authReducer.auth);
  const [commentText, setCommentText] = useState("");
  const products = useSelector(
    (state: RootState) => state.userReducer.products
  );

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { product: taken_product, err } = await getProduct(
        Number(params.id)
      );

      if (err !== "") {
        return;
      }
      taken_product.comments.reverse();
      const { user_profile, err: err_for_user } = await getUser(
        taken_product.user_id
      );
      if (err_for_user !== "") {
        return;
      }
      const date = new Date(taken_product.created_at);
      taken_product.created_at = date.toLocaleDateString();

      for (const i of products) {
        if (i.id === taken_product.id) {
          setIsYour(true);
          break;
        }
      }
      setMassage(err);
      setUserProfile(user_profile);
      setProduct(taken_product);
    })();
  }, [products]);
  const dispatch = useDispatch();
  if (product && userProfile) {
    return (
      <div>
        <Container class_for={classes.page}>
          <div className={classes.product}>
            <div className={classes.left + " " + classes.block}>
              <div className={classes.img}>
                <img
                  src={product?.image ? getUrl(product?.image) : ""}
                  alt="img"
                />
              </div>
            </div>
            <div className={classes.right + " " + classes.block}>
              {massage}
              {isYour && !isEdit ? (
                <>
                  <img
                    onClick={() => {
                      setIsEdit(true);
                    }}
                    width={20}
                    src={svg.src}
                    className={classes.edit}
                  ></img>
                  <div
                    onClick={() => {
                      (async () => {
                        const err = await deleteProduct(product?.id);
                        if (err === "") {
                          dispatch(userActions.deleteProduct(product.id));
                          router.push("/products/my");
                        }
                      })();
                    }}
                    className={classes.del}
                  >
                    del
                  </div>
                </>
              ) : (
                ""
              )}
              {isEdit && product ? (
                <FormEditProduct
                  product_for={product}
                  func={() => {
                    setIsEdit(false);
                  }}
                ></FormEditProduct>
              ) : (
                <>
                  <div>
                    <h2>{product?.name}</h2>
                    <Link href={`/profile/${userProfile.id}`}>
                      {userProfile.username}
                    </Link>
                    <h3>{product?.created_at}</h3>
                    <span>{product?.price}$</span>
                    <p>{product?.description}</p>
                  </div>
                  {isAuth && !isYour ? (
                    <button
                      onClick={() => {
                        (async () => {
                          if (product) {
                            const { cart_item, err } = await addCartItem(
                              product.id
                            );
                            if (err === "") {
                              dispatch(userActions.addToCart(cart_item));
                            }
                          }
                        })();
                      }}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
          <div className={[classes.comments, classes.block].join(" ")}>
            {isAuth ? (
              <div className={classes.add}>
                <textarea
                  placeholder="Add comment"
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                />
                <button
                  onClick={async () => {
                    if (commentText.length > 0) {
                      const { comment, err } = await addComment(
                        product.id,
                        commentText
                      );
                      if (err === "") {
                        dispatch(userActions.addComment(comment));
                        setProduct((prev) => {
                          if (!prev) return prev;
                          const prod = { ...prev };
                          prod.comments?.unshift(comment);
                          return prod;
                        });
                        setCommentText("");
                      }
                    }
                  }}
                >
                  ADD
                </button>
              </div>
            ) : (
              ""
            )}

            {product.comments.length > 0
              ? product.comments.map((comment) => {
                  return (
                    <div key={comment.id} className={classes.comment}>
                      <h3>{comment.user}</h3>
                      <h4>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </h4>
                      <p>{comment.text}</p>
                    </div>
                  );
                })
              : "0 comments"}
          </div>
        </Container>
      </div>
    );
  }
};
export default ProductPage;
