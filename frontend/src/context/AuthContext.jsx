import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {

    // Stores logged in user
    const [user, setUser] = useState(null);

    // Stores loading state
    const [loading, setLoading] = useState(false);

    // Stores login status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};