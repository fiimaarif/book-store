import { useSelector, useDispatch } from "react-redux";
import {
    addItemToCart,
    removeItemFromCart,
} from "../../../redux/slices/cartSlice";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, Button, Image, ListGroup, CloseButton } from 'react-bootstrap';

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const router = useRouter();

    const handleRemoveItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };


    return (
        <div>
             <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>
              {item.title} - {item.quantity} x Rp{item.price} = Rp{item.totalPrice}
            </div>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Amount: Rp{totalAmount}</h3>
      <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}
