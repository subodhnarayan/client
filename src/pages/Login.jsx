import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),

            });
            console.log("Login form", response);
            const responseData = await response.json();
            if (response.ok) {
                toast.success("login sucessfull");
                storeTokenInLS(responseData.token);
                console.log("res from server", responseData);
                setUser({
                    email: "",
                    password: "",
                });
                navigate("/");
            }
            else {
                toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
                //console.log('invalid credintals');
            }
        }
        catch (error) {
            console.log("register", error);
        }
    };


    // Example logic for login (replace with actual authentication logic)
    // if (user.email === "test@example.com" && user.password === "password") {
    //     // If login is successful, navigate to a different page
    //     navigate("/dashboard");
    // } else {
    //     // Handle login failure
    //     alert("Invalid credentials");
    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image reg-img">
                                <img
                                    src="/images/register.png"
                                    alt="a nurse with a cute look"
                                    width="400"
                                    height="500"
                                />
                            </div>
                            {/* Our main registration code */}
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            placeholder="email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            placeholder="password"
                                            required
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
