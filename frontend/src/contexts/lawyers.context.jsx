'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LawyersContext = createContext();

export function LawyersProvider({ children }) {
    const [lawyers, setLawyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lawyers`);
                if (response.data.status === 200) {
                    console.log('Fetched lawyers:', response.data.data.lawyers);
                    setLawyers(response.data.data.lawyers);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch lawyers');
                }
            } catch (err) {
                console.error('Error fetching lawyers:', err);
                setError(err.message || 'Failed to fetch lawyers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);

    const getLawyerById = (id) => {
        const lawyer = lawyers.find(lawyer => lawyer.id == id);
        return lawyer;
    };

    const getPracticeAreas = () => {
        return ["All", ...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas || []).filter(Boolean))];
    };

    const getCities = () => {
        return ["All", ...new Set(lawyers
            .map(lawyer => {
                if (!lawyer.address) return null;
                const parts = lawyer.address.split(',');
                return parts.length > 1 ? parts[1].trim() : parts[0].trim();
            })
            .filter(Boolean)
        )];
    };

    const getSpecializations = () => {
        return ["All", ...new Set(lawyers.map(lawyer => lawyer.specialization).filter(Boolean))];
    };

    const getLanguages = () => {
        return ["All", ...new Set(lawyers
            .flatMap(lawyer => {
                if (!lawyer.languages) return [];
                return lawyer.languages.split(',').map(lang => lang.trim());
            })
            .filter(Boolean)
        )];
    };

    const value = {
        lawyers,
        loading,
        error,
        getLawyerById,
        getPracticeAreas,
        getCities,
        getSpecializations,
        getLanguages
    };

    return (
        <LawyersContext.Provider value={value}>
            {children}
        </LawyersContext.Provider>
    );
}

export function useLawyers() {
    const context = useContext(LawyersContext);
    if (context === undefined) {
        throw new Error('useLawyers must be used within a LawyersProvider');
    }
    return context;
} 