import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const login = () => {
        const localData = localStorage.getItem("auth");

        if (localData) {
            setAuth(JSON.parse(localData));
        }
    };

    const logout = () => {
        localStorage.removeItem("auth");
        navigate("/");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;