import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase';


// create contect
export const AuthContext = createContext();


// provide AuthContext
const AuthProvider = ({ children }) => {
    const methods = useFirebase();
    return (
        <AuthContext.Provider value={methods}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;