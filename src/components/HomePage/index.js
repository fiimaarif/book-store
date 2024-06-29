import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faList, faTags, faThumbsUp, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'

function HomePage() {
    return (
        <div className="bg-light">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
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
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    KATALOG
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    TERBARU
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    REKOMENDASI
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    DISKON
                                </a>
                            </li>
                        </ul>
                        <FontAwesomeIcon icon={faCartShopping} color="#2ED084" size="xl" className="me-4"/>
                        <FontAwesomeIcon icon={faUser} color="#2ED084" size="xl"/>
                    </div>
                </div>
            </nav>
            {/* Hero */}
            <div className="container py-5 d-flex align-items-center">
                <div className="col-7">
                    <h1>Welcome to TUKUBUKU!</h1>
                    <h3>Discover Your Next Great Read</h3>
                    <h5 className="my-3">
                        Unleash Your Imagination with Our Curated Selection of
                        Books
                    </h5>
                    <h6 className="my-3">
                        Dive into a world of stories, knowledge, and adventure.
                        Whether you're a passionate reader or a curious
                        explorer, Book Haven offers a diverse collection of
                        books to satisfy every literary appetite. From timeless
                        classics to contemporary masterpieces, find your perfect
                        book and embark on an unforgettable journey.
                    </h6>
                    <button className="btn btn-success me-4">
                        Browse our collections
                    </button>
                    <button className="btn btn-primary">Sign up now</button>
                </div>
                <div className="col-5">
                    <Image
                        src="/images/hero-image-new.png"
                        width={100}
                        height={100}
                        layout="responsive"
                    ></Image>
                </div>
            </div>
            {/* Point of Information */}
            <div className="d-flex bg-white justify-content-around py-5">
                <div className="col-2 d-flex align-items-center">
                    <FontAwesomeIcon icon={faThumbsUp} color="#2ED084" size="2x" className="px-2" />
                    <h6>Rekomendasi pilihan sesuai selera Anda</h6>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <FontAwesomeIcon icon={faTags} color="#2ED084" size="2x" className="px-2" />
                    <h6>Diskon dan penawaran eksklusif</h6>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <FontAwesomeIcon icon={faList} color="#2ED084" size="2x" className="px-2"/>
                    <h6>Daftar bacaan yang dipersonalisasi</h6>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <FontAwesomeIcon icon={faTruck} color="#2ED084" size="2x" className="px-2"/>
                    <h6>Pengiriman gratis untuk pesanan di atas Rp500.000</h6>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
