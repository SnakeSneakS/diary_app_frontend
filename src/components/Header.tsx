import React, { FC, useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { Menu as MenuIcon, Close as CloseIcon, SupervisedUserCircle, Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import { checkAuthenticated, login, logout } from './Auth/Login';
import { useErrorContext } from './Core/Error';
import { useAuthContext } from './Auth/Auth';

const HeaderComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">MyApp</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} space-x-4`}>
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
                        {/*<li>
                            <Link to="/" className="hover:text-gray-400">
                                Home
                            </Link>
                        </li>*/}
                        <li>
                            <LoginOrProfileComponent />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};


export const LoginOrProfileComponent: FC = () => {
    const { isAuthenticated } = useAuthContext();
    return (
        <div>
            {
                isAuthenticated
                    ? <ProfileMenu></ProfileMenu>
                    :
                    <Link
                        className="text-inherit"
                        to="/login"
                    >
                        Login
                    </Link>
            }
        </div>
    )
}

export const ProfileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { setError } = useErrorContext();

    const toggleMenu = () => setIsOpen(prev => !prev);
    const handleLogout = () => {
        logout().then(() => {
            redirect("/");
        }).catch((e) => {
            setError(`${e}`);
        }).finally(() => {
            setIsOpen(false);
        })
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="flex items-center">
                <SupervisedUserCircle className="w-10 h-10 text-gray-500" />
            </button>

            {
                isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-1 py-1">
                            <Link
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                to={"/private/user/profile"}
                            >
                                <SupervisedUserCircle className="w-5 h-5 mr-2" />
                                Profile
                            </Link>
                            <button
                                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                <Logout className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default HeaderComponent;
