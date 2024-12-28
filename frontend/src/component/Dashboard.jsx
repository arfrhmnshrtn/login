// import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [expired, setExpired] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:3000/token");
            setToken(response.data.accesToken);
            const decoded = jwtDecode(response.data.accesToken);
            console.log(decoded);
            setName(decoded.name);
            setExpired(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentTime = new Date();
        if (expired * 1000 < currentTime.getTime()) {
            const response = await axios.get("http://localhost:3000/token");
            config.headers["Authorization"] = `Bearer ${response.data.accesToken}`;
            setToken(response.data.accesToken);
            const decoded = jwtDecode(response.data.accesToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get("http://localhost:3000/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
    }

    const logout = async () => {
        try {
            await axios.delete("http://localhost:3000/logout");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h1>Hello {name}</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUsers}>Get Users</button>

            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Log Out</button>
        </div>
    )
}

export default Dashboard
