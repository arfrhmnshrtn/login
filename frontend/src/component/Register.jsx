// import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const history = useNavigate();

    const Register = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/users", {
                name, email, password, confirmPassword
            });
            history("/");
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                setMsg(error.response.data.message);
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Register</h1>

                <form onSubmit={Register} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1 text-gray-600">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confPassword" className="mb-1 text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            name="confPassword"
                            id="confPassword"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <h2 className="text-red-500 italic">{msg}</h2>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Register
                    </button>

                </form>
                <p>Already have an account <Link to={'/'} className="text-blue-500">Login</Link></p>
            </div>
        </div>
    )
}

export default Register
