"use client";

import React from 'react';
import { Button } from "@mui/material";
import { login } from "../components/Auth/Login";
import { useErrorContext } from '../components/Core/Error';

const LoginPage: React.FC = () => {
    const { setError } = useErrorContext();

    return <div className="absolute inset-0 flex items-center justify-center">
        <Button
            onClick={() => {
                setError(null)
                login().catch(e => {
                    setError(e)
                })
            }}
        >
            <span
                className="text-5xl"
            >
                Login
            </span>
        </Button>
    </div>
}

export default LoginPage;
