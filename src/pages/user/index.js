import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { useEffect, useState } from "react";
import CardOrder from "@/components/CardOrder";
import CardMenuProfile from "@/components/CardMenuProfile";

export default function UserDashboard() {

    return (
        <div>
            <NavbarComponent />
            <div className="d-flex my-5 container gap-5">
                <CardMenuProfile/>
                <div className="col-12 col-md-8 col-lg-9">
                    <h5>Daftar Transaksi</h5>
                    <CardOrder/>
                </div>
            </div>
            <Footer />
        </div>
    );
}
