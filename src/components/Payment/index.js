import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { formatCurrency, formatDateTime } from "@/utils/constants";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Payment() {
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 * 1000);
    const [currentTime, setCurrentTime] = useState(new Date());
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1000) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prevTime - 1000;
            });
        }, 1000);

        const currentTimeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
            clearInterval(currentTimeInterval);
        };
    }, []);

    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const getCurrentDate = () => {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };

    return (
        <div>
            <Navbar />
            <div className="col-12 col-md-6 col-lg-4 mx-auto my-3">
                <div className="p-2 bg-info text-center rounded">
                    <p>Sisa Waktu Pembayaran Anda</p>
                    <h3 className="text-danger fw-bold">{hours} : {minutes} : {seconds}</h3>
                    <p>{getCurrentDate()}</p>
                </div>
                <div>
                    <div className="p-2 border rounded mt-3">
                        <p>Virtual akun mandiri (otomatis)</p>
                        <hr />
                        <small className="text-muted">Nomor Virtual Akun</small>
                        <div>1111111111</div>
                        <small className="text-muted">Nomor Pesanan</small>
                        <div>1X1J11H1P1</div>
                        <small className="text-muted">Tanggal Pesanan</small>
                        <div>{getCurrentDate()}</div>
                        <small className="text-muted">
                            Ringkasan Pembayaran
                        </small>
                        <div className="text-primary">
                        {formatCurrency(totalAmount)}
                        </div>
                    </div>
                </div>
                <button className="w-100 rounded btn btn-success mt-3" onClick={()=> router.push("/user")}>Konfirmasi Bayar</button>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;
