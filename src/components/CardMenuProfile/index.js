import { logout } from "@/utils/auth";
import Link from "next/link";
import React from "react";
import { Power, ShoppingBag, ShoppingCart, User } from "react-feather";

function CardMenuProfile() {
    return (
        <div className="col-12 col-md-4 col-lg-2 border p-2 rounded shadow-sm">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link
                        href="/admin"
                        className="text-decoration-none d-flex align-items-center"
                    >
                        <ShoppingCart className="ms-1 text-dark" />
                        <div className="nav-link">Pesanan Saya</div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href="/admin/books"
                        className="text-decoration-none d-flex align-items-center"
                    >
                        <User className="ms-1 text-dark" />
                        <div className="nav-link">Akun Saya</div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href="/admin/users"
                        className="text-decoration-none d-flex align-items-center"
                    >
                        <ShoppingBag className="ms-1 text-dark" />
                        <div className="nav-link">Wishtlist Saya</div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href={"#"}
                        onClick={logout}
                        className="text-decoration-none d-flex align-items-center"
                    >
                        <Power className="ms-1 text-dark" />
                        <div className="nav-link" style={{ cursor: "pointer" }}>
                            Logout
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CardMenuProfile;
