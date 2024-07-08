import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
    Modal,
    Button,
    ListGroup,
    CloseButton,
    Dropdown,
} from "react-bootstrap";
import { formatCurrency } from "@/utils/constants";
import { removeItemFromCart } from "../../../redux/slices/cartSlice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { User,Power, ShoppingCart, Trash } from 'react-feather';
import { isUserLoggedIn, logout } from "@/utils/auth";

function NavbarComponent() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleRemoveItem = (id) => { dispatch(removeItemFromCart(id)) };
    const handleCheckout = () => { router.push("/checkout") };

    useEffect(() => {
        if (typeof window !== 'undefined') { 
        setIsLoggedIn(isUserLoggedIn());
        }
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">TUKUBUKU</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <ShoppingCart onClick={handleShow} size={25} className="text-dark me-4" style={{ cursor: "pointer" }}/>
                        <Modal show={showModal} onHide={handleClose} scrollable>
                            <Modal.Header>
                                <Modal.Title>Shopping cart</Modal.Title>
                                <CloseButton onClick={handleClose} />
                            </Modal.Header>
                            <Modal.Body>
                                <ListGroup>
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <ListGroup.Item key={item.id}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <img
                                                            src={item.image}
                                                            thumbnail
                                                            alt="cart-image"
                                                            style={{width: "6rem"}}
                                                        />
                                                    </div>
                                                    <div className="ms-1">
                                                        <h5 className="mb-1">{item.title}</h5>
                                                        <small className="text-muted">{item.author}</small>
                                                        <div className="">
                                                            <p className="mb-1">
                                                                {formatCurrency(item.price)} X {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Trash
                                                            size={25}
                                                            className="text-danger"
                                                            style={{cursor: "pointer"}}
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <span className="text-center text-danger">
                                            Belum ada Item
                                        </span>
                                    )}
                                </ListGroup>
                            </Modal.Body>
                            <Modal.Footer className="d-block text-center">
                                <div className="d-flex justify-content-between">
                                    <p className="mb-0">Subtotal</p>
                                    <p className="mb-0">{formatCurrency(totalAmount)}</p>
                                </div>
                                <div className="mt-3">
                                    <Button
                                        variant="primary"
                                        disabled={!cartItems.length > 0}
                                        className="w-100"
                                        onClick={handleCheckout}
                                    >
                                        Checkout
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                        <Dropdown className="ms-2">
                            <Dropdown.Toggle
                                as="a"
                                bsPrefix=" "
                                id="dropdownUser"
                            >
                                <User size={25} className="text-dark" style={{cursor: "pointer"}}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="dropdown-menu dropdown-menu-end "
                                align="end"
                                aria-labelledby="dropdownUser"
                                show
                            >
                                <Dropdown.Item>
                                    <div className="text-decoration-none text-dark" onClick={() => router.push("/user")}>
                                    <User size={18} className="me-1 mb-1"/>Profile</div>
                                </Dropdown.Item>
                                    <div className=" dropdown-divider my-2"></div>
                                <Dropdown.Item>
                                {isLoggedIn ? (
                                    <div
                                    className="text-decoration-none text-dark"
                                    onClick={logout}
                                    href="/"
                                    >
                                    <Power size={18} className="me-1" />
                                    Log Out
                                    </div>
                                ) : (
                                    <div className="text-decoration-none text-dark" onClick={() => router.push("/login")}>
                                    <Power size={18} className="me-1" />
                                    Log In
                                    </div>
                                )}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
