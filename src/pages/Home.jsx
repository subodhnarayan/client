
//import { Analytics } from "../components/Analytics";
import { Navbar } from "../components/Navbar"

import React from "react";
export const Home = () => {
    return (
        <>

            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>I am Subodh Final Year Engineering Student</p>
                            <h1>Welcome to Subodh Portfolio</h1>
                            <p>
                                I am Subodh Final Year Engineering Student
                                I am Subodh Final Year Engineering Student
                                I am Subodh Final Year Engineering Student
                                I am Subodh Final Year Engineering Student
                                I am Subodh Final Year Engineering Student
                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">connect now</button>
                                </a>
                                <a href="/service">
                                    <button className="btn secondary-btn">learn more</button>
                                </a>
                            </div>
                        </div>
                        {/* //heroimages */}
                        <div className="hero-image">
                            <img
                                src="/images/home.png"
                                alt="coding together"
                                width="400"
                                height="500"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* 2nd section  */}
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    {/* <!-- Registered Companies --> */}
                    <div className="div1">
                        <p>Registered Companies</p>
                        <h2>1,00,000</h2>
                    </div>
                    {/* <!-- Happy Clients --> */}
                    <div className="div1">
                        <p>Happy Clients</p>
                        <h2>10,000</h2>
                    </div>
                    {/* <!-- Well Known Developer --> */}
                    <div className="div1">
                        <p>Well Known Developer</p>
                        <h2>1,000</h2>
                    </div>
                    {/* <!-- Services --> */}
                    <div className="div1">
                        <p>Services</p>
                        <h2>24/7</h2>
                    </div>
                </div>
            </section>

            {/* 3rd section  */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* hero images  */}
                    <div className="hero-image">
                        <img
                            src="/images/design.png"
                            alt="coding together"
                            width="400"
                            height="500"
                        />
                    </div>

                    <div className="hero-content">
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>
                            Ready to take the first step towards a more efficient and secure
                            IT infrastructure? Contact us today for a free consultation and
                            let's discuss how Thapa Technical can help your business thrive in
                            the digital age.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn">connect now</button>
                            </a>
                            <a href="/services">
                                <button className="btn secondary-btn">learn more</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};