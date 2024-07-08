import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../Navbar";
import { formatCurrency } from "@/utils/constants";
import Footer from "../Footer";

export default function Checkout() {
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const router = useRouter();
    const [namaPenerima, setNamaPenerima] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [email, setEmail] = useState("");
    const [kodePos, setKodePos] = useState("");
    const [alamatLengkap, setAlamatLengkap] = useState("");
    const [bank, setBank] = useState("");

    const handlePayment = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customerName: namaPenerima,
                customerEmail: email,
                customerAddress: alamatLengkap,
                customerPhone: nomorTelepon,
                postalCode: kodePos,
                bank,
                items: cartItems,
                totalAmount,
            }),
        });

        if (response.ok) {
            router.push("/payment");
        } else {
            const error = await response.json();
            alert(error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3">
                <h2 className="mt-3">Checkout</h2>
                <form onSubmit={handlePayment}>
                    <div className="d-flex gap-2">
                        <div className="mt-3 col-12 col-md-6 col-lg-7">
                            <div className="card p-2 shadow">
                                <h5>Detail Penerima</h5>
                                <hr />
                                <div className="mb-3 d-flex gap-1">
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <label
                                            htmlFor="namaPenerima"
                                            className="form-label"
                                        >
                                            Nama Penerima
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="namaPenerima"
                                            placeholder="Nama Penerima"
                                            value={namaPenerima}
                                            onChange={(e) =>
                                                setNamaPenerima(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <label
                                            htmlFor="nomorTelepon"
                                            className="form-label"
                                        >
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="nomorTelepon"
                                            placeholder="Nomor Telepon"
                                            value={nomorTelepon}
                                            onChange={(e) =>
                                                setNomorTelepon(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 d-flex gap-1">
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6">
                                        <label
                                            htmlFor="kodePos"
                                            className="form-label"
                                        >
                                            Kode Pos
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="kodePos"
                                            placeholder="Kode Pos"
                                            value={kodePos}
                                            onChange={(e) =>
                                                setKodePos(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="alamatLengkap"
                                        className="form-label"
                                    >
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="alamatLengkap"
                                        rows="3"
                                        placeholder="Alamat Lengkap (Kecamatan, Kabupaten/Kota, Provinsi)"
                                        value={alamatLengkap}
                                        onChange={(e) =>
                                            setAlamatLengkap(e.target.value)
                                        }
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="namaBank"
                                        className="form-label"
                                    >
                                        Nama Bank dan Nomor Rekening
                                    </label>
                                    <select
                                        className="form-select"
                                        id="namaBank"
                                        value={bank}
                                        onChange={(e) =>
                                            setBank(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Pilih Bank dan Nomor Rekening
                                        </option>
                                        <option value="BCA">
                                            BCA - 1234567890
                                        </option>
                                        <option value="Mandiri">
                                            Mandiri - 0987654321
                                        </option>
                                        <option value="BNI">
                                            BNI - 1122334455
                                        </option>
                                        <option value="BRI">
                                            BRI - 5566778899
                                        </option>
                                        <option value="CIMB">
                                            CIMB - 6677889900
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="mt-2 card p-2 shadow">
                                <h5>Detail Pesanan</h5>
                                <hr />
                                {cartItems.map((item) => (
                                    <div
                                        className="border rounded my-1 p-1"
                                        key={item.id}
                                    >
                                        <div className="d-flex align-items-center">
                                            <img
                                                style={{ height: 100 }}
                                                src={item.image}
                                                alt={item.title}
                                            />
                                            <div className="ms-3">
                                                <small className="text-muted">
                                                    {item.author}
                                                </small>
                                                <div>{item.title}</div>
                                                <div>
                                                    Quantity : {item.quantity}
                                                </div>
                                            </div>
                                            <p className="fw-bold ms-auto text-primary">
                                                {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h5 className="text-success">
                                        Total Pesanan
                                    </h5>
                                    <h5 className="text-primary">
                                        {formatCurrency(totalAmount)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 col-12 col-md-6 col-lg-5">
                            <div className="card p-2 shadow">
                                <h5>Pilih Metode Pembayaran</h5>
                                <hr />
                                <p className="fw-bold">Ringkasan Pembayaran</p>
                                <div className="d-flex justify-content-between">
                                    <div className="py-1">Total Harga</div>
                                    <div>Rp 10.000,00</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="py-1">
                                        Total Biaya Pengiriman
                                    </div>
                                    <div>Rp 10.000,00</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="py-1">Biaya Asuransi</div>
                                    <div>Rp 10.000,00</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="py-1">Diskon Belanja</div>
                                    <div>Rp 10.000,00</div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="py-1">
                                        Diskon Pengiriman
                                    </div>
                                    <div>Rp 10.000,00</div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold">Total Dibayar</p>
                                    <p className="fw-bold text-primary">
                                        Rp 100.000,00
                                    </p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-100 mt-3 rounded-pill btn btn-danger fs-5"
                            >
                                Bayar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
