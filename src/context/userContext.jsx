import React, { createContext, useState } from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [reenviado, setReenviado] = useState(false);
    const [user, setUser] = useState(() =>
        {
            const email = localStorage.getItem("userEmail");
            const token = localStorage.getItem("userToken");
            return email && token ? { email, token } : null;
        });

    const handleLogin = (email, token) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userEmail', email);
        setUser({ email, token });
        setShowLogin(false);
    };

    const handleLogOut = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userToken");
        setUser(null);
    };
    
    return (
        <userContext.Provider 
            value={{
                showLogin,
                setShowLogin,
                showRegister,
                setShowRegister,
                handleLogin,
                setReenviado, 
                reenviado,
                setShowLogin,
                user,
                setUser,
                handleLogOut,
            }}>
            {children}
        </userContext.Provider>
    );
};
