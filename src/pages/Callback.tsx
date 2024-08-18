import { FC, useEffect, useState } from "react";
import { loginCallback } from "../components/Auth/Login";
import { useErrorContext } from "../components/Core/Error";
import { useAuthContext } from "../components/Auth/Auth";

const LoginCallbackPage: FC = () => {
    const { setError } = useErrorContext();
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const [alreadyAuthenticated, setAlreadyAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        if (!isAuthenticated) {
            loginCallback().then(() => {
                setIsAuthenticated(true)
            }).catch(e => {
                setError(`${e}`)
                setIsAuthenticated(false)
            })
        } else {
            setAlreadyAuthenticated(true);
        }
    }, [])
    return <div>
        {isAuthenticated ? "Authenticated!!" : "Authentication failed..."}
        {alreadyAuthenticated && "Already authenticated"}
    </div>
}
export default LoginCallbackPage;