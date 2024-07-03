import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Modal, Button, ListGroup, CloseButton } from 'react-bootstrap';
import { addItemToCart } from "../../../redux/slices/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const handleBuy = (book) => {
        dispatch(addItemToCart(book)); // Tambahkan buku ke keranjang
        router.push('/cart'); // Navigasi ke halaman keranjang
      };
    
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()
    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    
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
                        <ListGroup.Item>
                            <div className="d-flex w-100 justify-content-between">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                                    thumbnail
                                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                    style={{ width: "6rem" }}
                                />
                                <div className="ms-3">
                                    <h5 className="mb-1">Throwback Hip Bag</h5>
                                    <small className="text-muted">Salmon</small>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <p className="mb-1">$90.00</p>
                                        <small className="text-muted">
                                            Qty 1
                                        </small>
                                        <Button
                                            variant="link"
                                            className="text-primary p-0"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-flex w-100 justify-content-between">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                    thumbnail
                                    alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                    style={{ width: "6rem" }}
                                />
                                <div className="ms-3">
                                    <h5 className="mb-1">
                                        Medium Stuff Satchel
                                    </h5>
                                    <small className="text-muted">Blue</small>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <p className="mb-1">$32.00</p>
                                        <small className="text-muted">
                                            Qty 1
                                        </small>
                                        <Button
                                            variant="link"
                                            className="text-primary p-0"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                        {/* More products... */}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer className="d-block text-center">
                    <div className="d-flex justify-content-between">
                        <p className="mb-0">Subtotal</p>
                        <p className="mb-0">$262.00</p>
                    </div>
                    <small className="text-muted">
                        Shipping and taxes calculated at checkout.
                    </small>
                    <div className="mt-3">
                        <Button onClick={handleBuy} variant="primary" className="w-100">
                            Checkout
                        </Button>
                    </div>
                    <div className="mt-3">
                        <p className="mb-0">or</p>
                        <Button variant="link" className="text-primary">
                            Continue Shopping &rarr;
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </nav>
    );
}

export default Navbar;
