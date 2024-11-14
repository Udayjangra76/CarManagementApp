import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import newRequest from "../Utils/BaseURL.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        onSubmit: async (values) => {
            try {
                const res = await newRequest.post("/api/auth/login", values);
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                toast.success("Login successful!");
                navigate("/");
            } catch (err) {
                toast.error(err.response?.data || "Login failed. Please try again.");
            }
        },
    });

    return (
        <div className="flex justify-center ">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="w-4/5 flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-400">
                {/* Main container */}
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    {/* Website title */}
                    <h1 className="text-4xl font-extrabold mb-6 text-center text-black-100">
                        Car Management App
                    </h1>

                    {/* Login form */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-black-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-black-700 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-blue-700 transition ease-in-out"
                            >
                                Login
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-black-600">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-blue-800">
                                    <b>Sign up </b>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

