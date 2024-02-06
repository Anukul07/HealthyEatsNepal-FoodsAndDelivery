import React from "react";
import '../styles/AboutUs.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutUs(){

    return(
        <>
        <div className="about-us-container">
            <Header/>
            <div className="about-us-body">
                <div className="body-logo">
                    <img src="src/assets/logo.png" className="body-logo-img"/>
                    <h2>Who we are</h2>
                </div>
                <div className="body-info" >
                    <img src="src/assets/chef.png" className="body-info-img"/>
                    <p className="body-info-p">At Healthy Eats Nepal, we're more than just a company — we're a passionate group of individuals dedicated to revolutionizing the food culture in Nepal. As the proud owner of Healthy Eats Nepal, I lead a team of two talented chefs who pour their creativity and expertise into crafting nutritious and delicious meals every single day. Supported by a diligent team of delivery workers, we ensure that our high-quality food reaches our valued customers promptly and with care. But our commitment doesn't stop there. Behind the scenes, we have two additional team members who work tirelessly to maintain the cleanliness and efficiency of our operations, ensuring that every aspect of our service exceeds expectations. At Healthy Eats Nepal, we're not just in the business of providing meals — we're on a mission to promote health and wellness through our subscription-based service. Our food isn't just tasty; it's carefully curated to nourish both body and soul. Join us in our journey to transform the way Nepal eats, one wholesome meal at a time.</p>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}
export default AboutUs

