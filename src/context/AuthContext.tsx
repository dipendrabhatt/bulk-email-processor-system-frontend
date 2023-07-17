import React, { createContext, useState } from 'react';

interface AuthContextProps {
    user: any;
    token: string;
    setUser: (user: any) => void;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: '',
    setUser: () => { },
    setToken: () => { },
});

//@ts-ignore
export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string>('');

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
