import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faList, faTags, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function About() {
    return (
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
    );
}

export default About;
