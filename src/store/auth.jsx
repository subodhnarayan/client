import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;
    const API = import.meta.env.VITE_APP_URI_API;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;
    console.log("token", token);
    console.log("isLoggedIn", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    // JWT authentication to get currently logged-in user
    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            if (response.ok) {
                const data = await response.json();
                console.log('user data', data.userData);
                setUser(data.userData);
                setIsLoading(false);
            } else {
                const errorData = await response.json();
                console.log("Error data:", errorData);
                console.log("Error message:", errorData.message);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error while fetching user data:", error);
        }
    };

    // Fetch services data from the database
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setServices(data);
            } else {
                console.log(`Failed to fetch services: ${response.statusText}`);
            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
        }
    };

    useEffect(() => {
        getServices();
        if (token) {
            userAuthentication();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
