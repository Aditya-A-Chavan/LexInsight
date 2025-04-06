'use client';

import { createContext, useState, useEffect } from 'react';

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        console.log('UserDataProvider: Initializing...');
        const storedData = localStorage.getItem('userData');
        console.log('UserDataProvider: Stored data:', storedData);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                console.log('UserDataProvider: Parsed data:', parsedData);
                setUserData(parsedData);
            } catch (error) {
                console.error('UserDataProvider: Error parsing stored data:', error);
                localStorage.removeItem('userData');
            }
        }
    }, []);

    useEffect(() => {
        console.log('UserDataProvider: userData changed:', userData);
        if (userData) {
            try {
                localStorage.setItem('userData', JSON.stringify(userData));
            } catch (error) {
                console.error('UserDataProvider: Error storing data:', error);
            }
        }
    }, [userData]);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;