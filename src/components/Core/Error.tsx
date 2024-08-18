import { Close, } from '@mui/icons-material';
import { Alert, IconButton } from '@mui/material';
import { createContext, useContext, FC, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

interface ErrorContextType {
    error: string | null,
    setError: Dispatch<SetStateAction<string | null>>
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorContextProvider: FC<{
    children?: ReactNode,
}> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    return (
        <ErrorContext.Provider value={{
            error: error,
            setError: setError,
        }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorContext = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useErrorContext must be used within an ErrorContextProvider');
    }
    return context;
};

export const ErrorDisplayComponent: FC = () => {
    const { error, setError } = useErrorContext();

    useEffect(() => {
        if (error) {
            console.error(error);
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, setError]);

    const close = () => setError(null);

    return (
        <div className="fixed bottom-32">
            {error && (
                <div className="flex items-center">
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                onClick={close}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {`${error}`}
                    </Alert>
                </div>
            )}
        </div>
    );
};