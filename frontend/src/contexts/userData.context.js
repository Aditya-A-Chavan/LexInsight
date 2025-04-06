'use client';

import { createContext, useState, useEffect } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;