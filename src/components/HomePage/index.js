import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faList, faTags, faThumbsUp, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { Navigation, Pagination, Autoplay , A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCurrency } from "@/utils/constants";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addItemToCart } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function HomePage() {

  const [books, setBooks] = useState([]);
  const dispatch = useDispatch()
  const router = useRouter()


  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('/api/book');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          const error = await response.json();
          console.error('Error fetching books:', error.message);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  const handleBuy = (book) => {
    dispatch(addItemToCart(book)); // Tambahkan buku ke keranjang
    router.push('/cart'); // Navigasi ke halaman keranjang
  };

    return (
        <div className="bg-light">
            {/* Navbar */}
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
                        />
                        <FontAwesomeIcon
                            icon={faUser}
                            color="#2ED084"
                            size="xl"
                        />
                    </div>
                </div>
            </nav>
            {/* Hero */}
            <section className="container mh-50 py-5 gap-md-3 gap-1 d-flex justify-content-between">
                <div className="col-9">
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                    >
                        <SwiperSlide>
                            <Image
                                className="rounded"
                                src="/images/slider-1.1.jpg"
                                width={100}
                                height={100}
                                layout="responsive"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                className="rounded"
                                src="/images/slider-2.1.jpg"
                                width={100}
                                height={100}
                                layout="responsive"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                className="rounded"
                                src="/images/slider-3.1.jpg"
                                width={100}
                                height={100}
                                layout="responsive"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="col-3">
                    <Image
                        className="rounded border border-2"
                        src="/images/slider-4.1.jpg"
                        width={100}
                        height={100}
                        layout="responsive"
                    ></Image>
                    <Image
                        className="rounded border border-2"
                        src="/images/slider-5.1.jpg"
                        width={100}
                        height={100}
                        layout="responsive"
                    ></Image>
                    <Image
                        className="rounded border border-2"
                        src="/images/slider-6.1.jpg"
                        width={100}
                        height={100}
                        layout="responsive"
                    ></Image>
                </div>
            </section>
            {/* Point of Information */}
            <section className="d-flex p-2 p-md-5 flex-wrap bg-white justify-content-around">
                <div className="col-md-2 col-6 d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        color="#2ED084"
                        size="2x"
                        className="px-2"
                    />
                    <h6>Rekomendasi pilihan sesuai selera Anda</h6>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faTags}
                        color="#2ED084"
                        size="2x"
                        className="px-2"
                    />
                    <h6>Diskon dan penawaran eksklusif</h6>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faList}
                        color="#2ED084"
                        size="2x"
                        className="px-2"
                    />
                    <h6>Daftar bacaan yang dipersonalisasi</h6>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center">
                    <FontAwesomeIcon
                        icon={faTruck}
                        color="#2ED084"
                        size="2x"
                        className="px-2"
                    />
                    <h6>Pengiriman gratis untuk pesanan di atas Rp500.000</h6>
                </div>
            </section>
            {/* New Book */}
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
            {/* Popular Book */}
            <section className="container">
                <h3 className="my-4">Terpopuler</h3>
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
                            <button className="btn btn-success w-100">
                                Beli
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            {/* For you Book */}
            <section className="container">
                <h3 className="my-4">Rekomendasi untukmu</h3>
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
                            <button className="btn btn-success w-100">
                                Beli
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            {/* Banner */}
            <section className="my-5 py-5 bg-custom">
                <div className="container d-flex flex-wrap align-items-center">
                    <div className="col-md-6 col-12">
                        <h1 className="text-light">
                            Kejutan sepesial dari kami
                            <br /> hanya untukmu
                        </h1>
                    </div>
                    <div className="col-md-6 col-12">
                        <form class="d-flex" role="search">
                            <input
                                class="form-control me-2"
                                type="email"
                                placeholder="email address"
                                aria-label="Search"
                            />
                            <button class="btn btn-danger" type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer class="py-3 my-4">
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary">
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary">
                            Features
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary">
                            Pricing
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary">
                            FAQs
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary">
                            About
                        </a>
                    </li>
                </ul>
                <p class="text-center text-body-secondary">
                    &copy; 2024{" "}
                    <span className="fw-bold text-success">TUKUBUKU</span>, Inc
                </p>
            </footer>
        </div>
    );
}

export default HomePage;
