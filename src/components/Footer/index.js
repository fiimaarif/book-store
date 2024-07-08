import Link from "next/link";
import React from "react";

function Footer() {
    return (
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item">
                    <Link href="#" className="nav-link px-2 text-body-secondary">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className="nav-link px-2 text-body-secondary">
                        Features
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className="nav-link px-2 text-body-secondary">
                        Pricing
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className="nav-link px-2 text-body-secondary">
                        FAQs
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className="nav-link px-2 text-body-secondary">
                        About
                    </Link>
                </li>
            </ul>
            <p className="text-center text-body-secondary">
                &copy; 2024{" "}
                <span className="fw-bold text-success">TUKUBUKU</span>, Inc
            </p>
        </footer>
    );
}

export default Footer;
