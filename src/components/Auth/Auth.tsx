import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useErrorContext } from "../Core/Error";
import { checkAuthenticated } from "./Login";


interface AuthContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: FC<{
    children?: ReactNode,
}> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { setError } = useErrorContext();

    useEffect(() => {
        checkAuthenticated().then(() => {
            setIsAuthenticated(true)
        }).catch((err) => {
            setIsAuthenticated(false)
            setError(`${err}`)
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useErrorContext must be used within an ErrorContextProvider');
    }
    return context;
};
