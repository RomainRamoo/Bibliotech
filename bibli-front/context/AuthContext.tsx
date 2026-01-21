'use client';


import { API_URL } from "@/lib/config";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type User = {
    username: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setloading] = useState(true);

    const tokenKey = 'auth_token';

    const fetchProfile = async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/auth/profile`,
                { headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        } catch {
            setUser(null)
        } finally {
            setloading(false);
        }
    };

    const login = async (username: string, password: string) => {
        const response = await axios.post(`${API_URL}/auth`, {
            username,
            password,
        });

        const token = response.data.access_token;
        localStorage.setItem(tokenKey, token);

        await fetchProfile(token);
    };

    const logout = () => {
        localStorage.removeItem(tokenKey);
        setUser(null);
    }

    useEffect(() => {
        const token = localStorage.getItem(tokenKey);
        if (!token) {
            setloading(false);
            return;
        }

        fetchProfile(token)
        .catch(() => logout())
        .finally(() => setloading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user,loading, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error ('useAuth must be used inside AuthProvider');
    return ctx;
};