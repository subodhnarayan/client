import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);

    const { user } = useAuth();




    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });

        setUserData(false);
    }


    const handleInput = (e) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            if (response.ok) {
                await response.json();
                toast.success("Message has been sent successfully");
                setContact({
                    username: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            console.log("contact", error);
        }
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>
                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img
                            src="/images/support.png"
                            alt="We are ready to help"
                            width="400"
                            height="500"
                        />
                    </div>
                    <div className="section-form">
                        <h1 className="main-heading mb-3">Contact Form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    placeholder="username"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    placeholder="email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    cols="30"
                                    rows="6"
                                    required
                                    value={contact.message}
                                    onChange={handleInput}
                                    placeholder="message"
                                ></textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-submit">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <section className="mb-3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </section>
        </>
    );
};
