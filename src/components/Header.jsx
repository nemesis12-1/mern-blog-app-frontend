import React, { useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import {server_url} from '../App'


const Header = () => {

    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`${server_url}/profile`, {
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((userInfo) => {
                setUserInfo(userInfo);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, []);


    const logoutHandler = () => {
        fetch(`${server_url}/logout`, {
            credentials: "include",
            method: "POST",
        })
        toast.success("Logged out successfully");
        setUserInfo(null);
    }

    const user = userInfo?.email;

    return (
        <>
            <header className=" shadow-lg ">
                <div className="w-[90%] mx-auto md:flex justify-between items-center my-2 p-2 text-center ">

                    <Link to="/" >
                        <div className="font-bold text-3xl mb-6 md:mb-0">

                            WeBlog
                        </div>
                    </Link>

                    {user && (
                        <>
                            <nav className="flex gap-4 sm:justify-center sm:items-center  ">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `text-blue-400 font-bold px-4 py-2 rounded text-xl`
                                            : `font-bold px-4 py-2 rounded text-xl`
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/create"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `text-blue-400 font-bold px-4 py-2 rounded text-xl`
                                            : `font-bold px-4 py-2 rounded text-xl`
                                    }
                                >
                                    Create Post
                                </NavLink>

                                <Link to='/'>
                                    <button onClick={logoutHandler} className="bg-red-400 px-4 py-2 rounded hover:bg-red-600">Logout</button>
                                </Link>
                            </nav>
                        </>
                    )}

                    {!user && (
                        <>
                            <nav className="flex gap-4 sm:justify-center sm:items-center ">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `text-blue-400 font-bold px-4 py-2 rounded text-xl underline`
                                            : `font-bold px-4 py-2 rounded text-xl`
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `text-white bg-blue-400 px-4 py-2 rounded text-xl `
                                            : `bg-blue-400 px-4 py-2 rounded text-xl`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) =>
                                        isActive
                                            ? `text-blue-400 font-bold px-4 py-2 rounded text-xl underline`
                                            : `font-bold px-4 py-2 rounded text-xl`
                                    }
                                >
                                    Register
                                </NavLink>
                            </nav>
                        </>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
