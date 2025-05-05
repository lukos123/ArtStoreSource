import {
  CartItem,
  CartItemGroup,
  Comment,
  Notification,
  Order,
  Product,
  User,
  UserProfile,
} from "@/types/types";

const API = "http://localhost:5001";
export const NotFound = "Not Found";
export const AccessTokenNotFound = "Access Token Not Found"; 
export const RefreshTokenNotFound = "Refresh Token Not Found";
export const PasswordIsSmall = "Password Is Too Short";
export const UsernameIsSmall = "Username Is Too Short";
export const EmailIsNotValid = "Invalid Email Address";
export const UserAlreadyExist = "User Already Exists";
export const NameIsEmpty = "Name Cannot Be Empty";
export const PriceIsEmpty = "Price Cannot Be Empty";
export const NotOK = "Operation Failed";

export function getUrl(url: string) {
  if (url !== "none") return API + "/" + url;
}


// possible errors:
// NotOK
export async function login(
  username: string,
  password: string
): Promise<string> {
  const res = await fetch_post(`${API}/auth/login`, {
    username: username,
    password: password,
  });
  const json = await res.json();

  if (!res.ok) {
    return NotOK;
  }
  localStorage.setItem("access_token", json.access_token);
  localStorage.setItem("refresh_token", json.refresh_token);
  return "";
}

// possible errors:
// NotOK
export function logout() {
  localStorage.setItem("access_token", "");
  localStorage.setItem("refresh_token", "");
}

// possible errors:
// NotOK
// PasswordIsSmall
// UsernameIsSmall
// EmailIsNotValid
// UserAlreadyExist
export async function register(
  username: string,
  email: string,
  password: string
): Promise<string> {
  const res = await fetch_post(`${API}/auth/register`, {
    username: username,
    email: email,
    password: password,
  });
  const json = await res.json();
  if (json.message) {
    return json.message;
  }
  if (!res.ok) {
    return NotOK;
  }
  localStorage.setItem("access_token", json.access_token);
  localStorage.setItem("refresh_token", json.refresh_token);
  return "";
}

// possible errors:
// RefreshTokenNotFound
// NotOK
export async function refresh(): Promise<string> {
  const refresh_token = get_refresh_token();
  if (refresh_token == NotFound) {
    return RefreshTokenNotFound;
  }
  const res = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  const json = await res.json();

  if (!res.ok) {
    return NotOK;
  }
  localStorage.setItem("access_token", json.access_token);
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getMainUser(): Promise<{ user: User; err: string }> {
  const { res, ok } = await fetch_get_with_auth(`${API}/users/main`);
  const json = await res.json();

  if (!ok) {
    return { user: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh !== "") return { user: json, err: err_refresh };
    else {
      return await getMainUser();
    }
  }
  return { user: json, err: "" };
}

// possible errors:
// NotOK
export async function getUser(
  id: number
): Promise<{ user_profile: UserProfile; err: string }> {
  const res = await fetch_get(`${API}/users/${id}`);
  const json = await res.json();

  if (!res.ok) {
    return { user_profile: json, err: NotOK };
  }
  return { user_profile: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getCarts(): Promise<{
  carts: CartItemGroup[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/cart`);
  const json = await res.json();
  if (!ok) {
    return { carts: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getCarts();
    else return { carts: json, err: NotOK };
  }
  return { carts: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getMainCart(): Promise<{
  cart: CartItemGroup;
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/cart/main`);
  const json = await res.json();
  if (!ok) {
    return { cart: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getMainCart();
    else return { cart: json, err: NotOK };
  }
  return { cart: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function addCartItem(
  product_id: number,
  quantity: number = 1
): Promise<{
  cart_item: CartItem;
  err: string;
}> {
  const { res, ok } = await fetch_post_with_auth(`${API}/cart`, {
    product_id,
    quantity,
  });
  const json = await res.json();
  if (!ok) {
    return { cart_item: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await addCartItem(product_id, quantity);
    else return { cart_item: json, err: NotOK };
  }
  return { cart_item: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function editCartItem(
  cart_item_id: number,
  quantity: number = 1
): Promise<{
  cart_item: CartItem;
  err: string;
}> {
  const { res, ok } = await fetch_put_with_auth(`${API}/cart/${cart_item_id}`, {
    quantity,
  });
  const json = await res.json();
  if (!ok) {
    return { cart_item: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await editCartItem(cart_item_id, quantity);
    else return { cart_item: json, err: NotOK };
  }
  return { cart_item: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function deleteCartItem(cart_item_id: number): Promise<string> {
  const { res, ok } = await fetch_delete_with_auth(
    `${API}/cart/${cart_item_id}`
  );
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await deleteCartItem(cart_item_id);
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
// ok -> Start order
export async function startOrder(): Promise<string> {
  const { res, ok } = await fetch_post_with_auth(`${API}/cart/order`);
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok || json.message !== "Start order") {
    const err_refresh = await refresh();
    if (err_refresh === "") return await startOrder();
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getAllOrders(): Promise<{
  orders: Order[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/cart/order/all`);
  const json = await res.json();
  if (!ok) {
    return { orders: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getAllOrders();
    else return { orders: json, err: NotOK };
  }
  return { orders: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getOrder(order_id: number): Promise<{
  order: Order;
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(
    `${API}/cart/order/${order_id}`
  );
  const json = await res.json();
  if (!ok) {
    return { order: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getOrder(order_id);
    else return { order: json, err: NotOK };
  }
  return { order: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
// ok -> Finish order
export async function finishOrderByClient(
  order_id: number,
  delivery: string,
  delivery_to: string
): Promise<string> {
  const { res, ok } = await fetch_post_with_auth(
    `${API}/cart/order/finish/client`,
    {
      order_id,
      delivery,
      delivery_to,
    }
  );
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok || json.message !== "Finish order") {
    const err_refresh = await refresh();
    if (err_refresh === "")
      return await finishOrderByClient(order_id, delivery, delivery_to);
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
// ok -> Finish order
export async function deleteOrder(): Promise<string> {
  const { res, ok } = await fetch_delete_with_auth(`${API}/cart/order/`);
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok || json.message !== "Order deleted") {
    const err_refresh = await refresh();
    if (err_refresh === "") return await deleteOrder();
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
// ok -> Finish order
export async function finishOrderBySupplier(order_id: number): Promise<string> {
  const { res, ok } = await fetch_post_with_auth(
    `${API}/cart/order/finish/supplier`,
    {
      order_id,
    }
  );
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok || json.message !== "Finish order") {
    const err_refresh = await refresh();
    if (err_refresh === "") return await finishOrderBySupplier(order_id);
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
// ok -> Confirm order
export async function confirmDeliveryOfOrderByClient(
  order_id: number,
  item_id?: number
): Promise<string> {
  const obj: { order_id: number; item_id?: number } = {
    order_id,
  };
  if (item_id) {
    obj.item_id = item_id;
  }
  const { res, ok } = await fetch_post_with_auth(
    `${API}/cart/order/confirm`,
    obj
  );
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok || json.message !== "Confirm order") {
    const err_refresh = await refresh();
    if (err_refresh === "")
      return await confirmDeliveryOfOrderByClient(order_id, item_id);
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getAllOrderNotification(): Promise<{
  notifications: Notification[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/notification`);
  const json = await res.json();
  if (!ok) {
    return { notifications: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getAllOrderNotification();
    else return { notifications: json, err: NotOK };
  }
  return { notifications: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getMadeOrderNotification(): Promise<{
  notifications: Notification[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/notification/made`);
  const json = await res.json();
  if (!ok) {
    return { notifications: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getMadeOrderNotification();
    else return { notifications: json, err: NotOK };
  }
  return { notifications: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getNotMadeOrderNotification(): Promise<{
  notifications: Notification[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/notification/not_made`);
  const json = await res.json();
  if (!ok) {
    return { notifications: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getNotMadeOrderNotification();
    else return { notifications: json, err: NotOK };
  }
  return { notifications: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getSentOrderNotification(): Promise<{
  notifications: Notification[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/notification/sent`);
  const json = await res.json();
  if (!ok) {
    return { notifications: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getSentOrderNotification();
    else return { notifications: json, err: NotOK };
  }
  return { notifications: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getNotSentOrderNotification(): Promise<{
  notifications: Notification[];
  err: string;
}> {
  const { res, ok } = await fetch_get_with_auth(`${API}/notification/not_sent`);
  const json = await res.json();
  if (!ok) {
    return { notifications: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getNotSentOrderNotification();
    else return { notifications: json, err: NotOK };
  }
  return { notifications: json, err: "" };
}

// possible errors:
// NotOK
export async function getAllProducts(): Promise<{
  products: Product[];
  err: string;
}> {
  const res = await fetch_get(`${API}/products`);
  const json = await res.json();

  if (!res.ok) {
    return { products: json, err: NotOK };
  }
  return { products: json, err: "" };
}

// possible errors:
// NotOK
export async function getProduct(product_id: number): Promise<{
  product: Product;
  err: string;
}> {
  const res = await fetch_get(`${API}/products/${product_id}`);
  const json = await res.json();

  if (!res.ok) {
    return { product: json, err: NotOK };
  }
  return { product: json, err: "" };
}

// possible errors:
// NotOK
export async function getComments(product_id: number): Promise<{
  comments: Comment[];
  err: string;
}> {
  const res = await fetch_get(`${API}/products/${product_id}/comments`);
  const json = await res.json();

  if (!res.ok) {
    return { comments: json, err: NotOK };
  }
  return { comments: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function addComment(
  product_id: number,
  text: string
): Promise<{
  comment: Comment;
  err: string;
}> {
  const { res, ok } = await fetch_post_with_auth(
    `${API}/products/${product_id}/comments`,
    {
      text,
    }
  );
  const json = await res.json();
  if (!ok) {
    return { comment: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await addComment(product_id, text);
    else return { comment: json, err: NotOK };
  }
  return { comment: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NameIsEmpty
// PriceIsEmpty
// NotOK
export async function addProduct(
  name: string,
  price: number,
  description?: string
): Promise<{
  product: Product;
  err: string;
}> {
  const body: {
    name: string;
    price: number;
    description?: string;
  } = {
    name,
    price,
  };

  description ? (body.description = description) : "";
  const { res, ok } = await fetch_post_with_auth(`${API}/products`, body);
  const json = await res.json();
  if (json.massage) {
    return { product: json, err: json.massage };
  }
  if (!ok) {
    return { product: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await addProduct(name, price, description);
    else return { product: json, err: NotOK };
  }
  return { product: json, err: "" };
}

export async function setProductImage(
  product_id: number,
  imageFile: any
): Promise<{
  image: string;
  err: string;
}> {
  const body = new FormData();
  body.append("file", imageFile);

  const { res, ok } = await fetch_put_with_auth_without_stringify(
    `${API}/products/image/${product_id}`,
    body
  );
  const json = await res.json();
  if (!ok) {
    return { image: json.image, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await setProductImage(product_id, imageFile);
    else return { image: json.image, err: NotOK };
  }
  return { image: json.image, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function editProduct(
  product_id: number,
  name: string,
  price: number,
  description: string
): Promise<{
  product: Product;
  err: string;
}> {
  const { res, ok } = await fetch_put_with_auth(
    `${API}/products/${product_id}`,
    {
      name,
      price,
      description,
    }
  );
  const json = await res.json();
  if (!ok) {
    return { product: json, err: AccessTokenNotFound };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "")
      return await editProduct(product_id, name, price, description);
    else return { product: json, err: NotOK };
  }
  return { product: json, err: "" };
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function deleteProduct(product_id: number): Promise<string> {
  console.log(product_id);

  const { res, ok } = await fetch_delete_with_auth(
    `${API}/products/${product_id}`
  );
  const json = await res.json();
  if (!ok) {
    return AccessTokenNotFound;
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await deleteProduct(product_id);
    else return NotOK;
  }
  return "";
}

// possible errors:
// AccessTokenNotFound
// NotOK
export async function getUsers(): Promise<{
  user_profiles: UserProfile[];
  err: string;
}> {
  const res = await fetch_get(`${API}/users`);
  const json = await res.json();

  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh === "") return await getUsers();
    else return { user_profiles: json, err: NotOK };
  }
  return { user_profiles: json, err: "" };
}

// possible errors:
// NotOK
// AccessTokenNotFound
// PasswordIsSmall
// UsernameIsSmall
// EmailIsNotValid
export async function editUser(
  username?: string,
  email?: string,
  description?: string,
  password?: string
): Promise<{
  user: User;
  err: string;
}> {
  const json: {
    username?: string;
    email?: string;
    description?: string;
    password?: string;
  } = {};

  username ? (username?.length > 5 ? (json.username = username) : "") : "";
  email ? (json.email = email) : "";
  password ? (password.length > 5 ? (json.password = password) : "") : "";
  description ? (json.description = description) : "";
  console.log(json);

  const { res, ok } = await fetch_put_with_auth(`${API}/users/main`, json);
  const user = await res.json();

  if (!ok) {
    return { user: user, err: AccessTokenNotFound };
  }
  if (user.message) {
    return { user: user, err: user.message };
  }
  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh !== "") return { user: user, err: err_refresh };
    else {
      return await editUser(username, email, description);
    }
  }

  return { user: user, err: "" };
}

export async function editUserImg(
  img: any
): Promise<{ logo: string; err: string }> {
  const json = new FormData();
  json.append("file", img);
  // console.log(img);

  const { res, ok } = await fetch_put_with_auth_without_stringify(
    `${API}/users/main/logo`,
    json
  );
  const logo = await res.json();

  if (!ok) {
    return { logo: logo, err: AccessTokenNotFound };
  }

  if (!res.ok) {
    const err_refresh = await refresh();
    if (err_refresh !== "") return { logo: logo, err: err_refresh };
    else {
      return await editUserImg(img);
    }
  }

  return { logo: logo.logo, err: "" };
}

async function fetch_with_auth(input: string, option: {} = {}) {
  const access_token = get_access_token();
  if (access_token == NotFound) {
    return { res: await fetch(""), ok: false };
  }
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await fetch(input, option);

  return { res: res, ok: true };
}

async function fetch_post_with_auth(input: string, json: {} = {}) {
  const access_token = get_access_token();
  if (access_token == NotFound) {
    return { res: await fetch(""), ok: false };
  }
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  return {
    res: await fetch(input, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(json),
    }),
    ok: true,
  };
}

async function fetch_delete_with_auth(input: string, json: {} = {}) {
  const access_token = get_access_token();
  if (access_token == NotFound) {
    return { res: await fetch(""), ok: false };
  }

  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  return {
    res: await fetch(input, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(json),
    }),
    ok: true,
  };
}

async function fetch_get_with_auth(input: string) {
  const access_token = get_access_token();
  if (access_token == NotFound) {
    return { res: await fetch(""), ok: false };
  }
  const headers = {};
  return {
    res: await fetch(input, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    }),
    ok: true,
  };
}

async function fetch_put_with_auth(input: string, json: {} = {}) {
  const access_token = get_access_token();
  if (access_token == NotFound) {
    return { res: await fetch(""), ok: false };
  }
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const js = JSON.stringify(json);

  return {
    res: await fetch(input, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
      body: js,
    }),
    ok: true,
  };
}

async function fetch_put_with_auth_without_stringify(
  input: string,
  json: FormData
) {
  const access_token = get_access_token();
  if (access_token == NotFound) {
    return { res: await fetch(""), ok: false };
  }
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  return {
    res: await fetch(input, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: json,
    }),
    ok: true,
  };
}

async function fetch_post(input: string, json: {} = {}) {
  return await fetch(input, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(json),
  });
}
async function fetch_get(input: string) {
  return await fetch(input, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

function get_access_token(): string {
  let access_token = localStorage.getItem("access_token");
  if (access_token !== null) {
    return access_token;
  } else {
    return NotFound;
  }
}
function get_refresh_token(): string {
  let refresh_token = localStorage.getItem("refresh_token");
  if (refresh_token !== null) {
    return refresh_token;
  } else {
    return NotFound;
  }
}
