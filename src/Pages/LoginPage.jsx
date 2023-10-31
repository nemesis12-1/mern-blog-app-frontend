import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import {server_url} from '../App'

const LoginPage = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const { setUserInfo } = useContext(UserContext);

    const loginHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${server_url}/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        if (response.status === 200) {
            response.json().then(data => {
                setUserInfo(data);
                toast.success("User logged in successfully");
                navigate('/');
            })
        } else {
            toast.error("Invalid Email or Password");
        }
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto bg-white rounded-md shadow-lg mt-[8%] mb-[6rem] border border-slate-200">
                <div className="text-center p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 underline">Login</h2>
                </div>

                <form className="p-4" onSubmit={loginHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage