import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import {server_url} from '../App'



const SignUpPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signupHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${server_url}/signup`, {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        if (response.status === 200) {
            toast.success("User created successfully");
        } else {
            toast.error("Email already exists");
        }
        navigate('/login');

    }


    return (
        <>

            <div className="w-full max-w-md mx-auto bg-white rounded-md shadow-lg mt-[8%] mb-[6rem]  border border-slate-200">
                <div className="text-center p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 underline">Register here to Access Weblog</h2>
                </div>

                <form className="p-4" onSubmit={signupHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="name"
                            type="name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUpPage