import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null); // Add error state
    const { authorizationToken } = useAuth();

    const getAllContacts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Contacts Data:", data);
            setContacts(data); // Assuming the data is an array of contacts
        } catch (error) {
            console.error("Error fetching contacts:", error);
            setError("Failed to fetch contacts. Please try again later.");
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to delete contact: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Contact Deleted:", data);
            // Fetch contacts again to update the list
            getAllContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
            setError("Failed to delete contact. Please try again later.");
        }
    };

    useEffect(() => {
        if (authorizationToken) {
            getAllContacts();
        }
    }, [authorizationToken]);

    return (
        <section className="admin-user-section">
            <div className="container">
                <h1>Contacts Data</h1>
                {error && <p className="error-message">{error}</p>}
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length > 0 ? (
                            contacts.map((curUser, index) => (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.message}</td>
                                    <td>
                                        <button onClick={() => deleteContact(curUser._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No contacts available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
