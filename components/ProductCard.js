import Link from "next/link";
import styles from "./ProductCard.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  set_first_item_in_cart,
  set_add_to_total_price,
  set_second_item_in_cart,
} from "../store/slices/cart.slice";
import { set_in_my_cart } from "../store/slices/products.slice";

const ProductCard = (props) => {
  const authSlice = useSelector((state) => state.authSlice);
  const CartSlice = useSelector((state) => state.CartSlice);
  const [is_product_in_cart, set_is_product_in_cart] = useState(false);

  const [showNotification, setshowNotification] = useState(false);
  const dispatch = useDispatch();
  const addToCart = (item) => {
    if (CartSlice.cart_products.length > 1) {
      dispatch(set_second_item_in_cart(item));
    }
    dispatch(set_first_item_in_cart(item));

    dispatch(set_add_to_total_price(item));
    setshowNotification(true);
    setTimeout(() => setshowNotification(false), 2000);

    dispatch(set_in_my_cart(item));
  };

  React.useEffect(() => {
    const product = CartSlice.cart_products.find((p) => p.id === props.id);
    if (product) {
      set_is_product_in_cart(true);
    } else {
      set_is_product_in_cart(false);
    }
  }, [CartSlice.cart_products, props.id]);

  return (
    <>
      {showNotification && (
        <div className={`notification is-success ${styles.showNotification}`}>
          product added to cart
        </div>
      )}

      <div className={styles.myCard}>
        <Link href={`/single-page/${props.id}`} passHref>
          <a>
            <div className={styles.Image}>
              <img src={props.img_url} />
            </div>
          </a>
        </Link>
        <div className={styles.content}>
          <p className={styles.category}>{props.category}</p>
          <p className={styles.itemName}>{props.name}</p>
          {props.discount > 1 && (
            <p className={styles.discount}>
              {props.price + props.discount + "$"}
            </p>
          )}
          <p className={styles.itemPrice}>{props.price + "$"}</p>
          {authSlice.isLogIn && (
            <button
              className={styles.itemButton}
              onClick={() => addToCart(props)}
            >
              {is_product_in_cart ? "Product already in cart" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductCard;
