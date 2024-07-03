import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, ListGroup, CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatCurrency } from "@/utils/constants";
import { removeItemFromCart } from "../../../redux/slices/cartSlice";

function Navbar() {
    
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()
    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const handleRemoveItem = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand text-success fw-bold" href="#">
                    TUKUBUKU
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0"></ul>
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        color="#2ED084"
                        size="xl"
                        className="me-4"
                        onClick={handleShow}
                    />
                    <FontAwesomeIcon icon={faUser} color="#2ED084" size="xl" />
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} scrollable>
                <Modal.Header>
                    <Modal.Title>Shopping cart</Modal.Title>
                    <CloseButton onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {cartItems.length > 0 ? cartItems.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img
                                            src={item.image}
                                            thumbnail
                                            alt="cart-image"
                                            style={{ width: "6rem" }}
                                        />
                                    </div>
                                    <div className="ms-1">
                                        <h5 className="mb-1">{item.title}</h5>
                                        <small className="text-muted">
                                            {item.author}
                                        </small>
                                        <div className="">
                                            <p className="mb-1">
                                                {formatCurrency(item.price)} X{" "}
                                                {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            color="#dc3545"
                                            size="2xl"
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                        />
                                    </div>
                                </div>
                            </ListGroup.Item>
                        )) : <span className="text-center text-danger">Belum ada Item</span>}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer className="d-block text-center">
                    <div className="d-flex justify-content-between">
                        <p className="mb-0">Subtotal</p>
                        <p className="mb-0">{formatCurrency(totalAmount)}</p>
                    </div>
                    <div className="mt-3">
                        <Button variant="primary" className="w-100">
                            Checkout
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </nav>
    );
}

export default Navbar;
