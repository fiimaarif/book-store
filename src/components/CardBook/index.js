import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/constants";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/slices/cartSlice";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ShoppingCart } from 'react-feather';


function CardBook() {
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch();
    const routes = useRouter()

    const handleCart = (book) => {
        dispatch(addItemToCart(book));
    };

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch("/api/book");
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data);
                } else {
                    const error = await response.json();
                    console.error("Error fetching books:", error.message);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }

        fetchBooks();
    }, []);

    return (
        <section className="container">
            <h3 className="my-4">Terbaru</h3>
            <div className="d-flex gap-4">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="col-md-2 col-6 p-2 border rounded"
                    >
                        <div>
                            <Image
                                src={book.image}
                                width={100}
                                height={100}
                                layout="responsive"
                            />
                        </div>
                        <small className="pt-1 text-muted">{book.author}</small>
                        <div className="">{book.title}</div>
                        <div className="pb-2 text-danger">
                            {formatCurrency(book.price)}
                        </div>
                        <div className="d-flex justify-content-between align-items-center gap-2">
                            <button
                                className="btn btn-success w-75"
                                onClick={() => routes.push("/checkout")}
                            >
                                Beli
                            </button>
                            <div>
                            <ShoppingCart
                            className="text-danger"
                            onClick={() => handleCart(book)}
                            style={{cursor: "pointer"}}
                            />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CardBook;
