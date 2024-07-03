import React from "react";

function Ads() {
    return (
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
    );
}

export default Ads;
