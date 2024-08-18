import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./Auth";

export const LoginRequiredRoute: FC = () => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated)
        return <Navigate to="/login" />
    return <Outlet />
}