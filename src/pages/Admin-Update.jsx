import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();  // Getting id from URL
    const { authorizationToken } = useAuth();

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                console.log('User Single Data:', userData);
                setData(userData.result || { username: "", email: "", phone: "" }); // Ensure data has default values
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, [authorizationToken, params.id]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success("Updated Sucessfully");
            }
            else {
                toast.error("Not Updated");
            }

        }
        catch (error) {
            console.error("Error deleting contact:", error);
        }

    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update User Data</h1>
            </div>
            <div className="container grid grid-two-cols">
                <div className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.username || ""} // Ensure value is always a string
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
                                value={data.email || ""} // Ensure value is always a string
                                onChange={handleInput}
                                placeholder="email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Mobile</label>
                            <input
                                type="text" // Changed to "text" as "phone" is not a standard type
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                value={data.phone || ""} // Ensure value is always a string
                                onChange={handleInput}
                                placeholder="phone"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
