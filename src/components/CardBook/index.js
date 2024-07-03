import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/constants";
import Image from "next/image";

function CardBook() {
    const [books, setBooks] = useState([]);

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
                        <div className="pt-1 text-muted">{book.author}</div>
                        <div className="">{book.title}</div>
                        <div className="pb-2 text-danger">
                            {formatCurrency(book.price)}
                        </div>
                        <button
                            onClick={() => handleBuy(book)}
                            className="btn btn-success w-100"
                        >
                            Beli
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CardBook;
