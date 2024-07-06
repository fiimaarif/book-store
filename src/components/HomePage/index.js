import React from "react";
import Navbar from "../Navbar";
import CardBook from "../CardBook";
import HeroSlider from "../HeroSlider";
import About from "../About";
import Ads from "../Ads";
import Footer from "../Footer";
import NavbarComponent from "../Navbar";

function HomePage() {

    return (
        <div className="bg-light">
            <NavbarComponent/>
            <HeroSlider/>
            <About/>
            <CardBook/>
            <Ads/>
            <Footer/>
        </div>
    );
}

export default HomePage;
