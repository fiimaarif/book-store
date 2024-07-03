import React from "react";
import Navbar from "../Navbar";
import CardBook from "../CardBook";
import HeroSlider from "../HeroSlider";
import About from "../About";
import Ads from "../Ads";
import Footer from "../Footer";

function HomePage() {

    return (
        <div className="bg-light">
            <Navbar/>
            <HeroSlider/>
            <About/>
            <CardBook/>
            <Ads/>
            <Footer/>
        </div>
    );
}

export default HomePage;
