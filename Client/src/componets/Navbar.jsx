import React, { useState, useEffect } from 'react';
export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch user data if logged in (assuming it's stored in localStorage or can be fetched via an API)
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);  // assuming user object has a name field
        }
    }, []);

    const handleLogout = () => {
        // Clear user data and set logged-out state
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <header className="inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 shadow backdrop-blur-lg md:top-6 md:rounded-1xl lg:max-w-screen-lg">
            <div className="px-2">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <img src="https://res.cloudinary.com/dulqpw1jf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1731608410/CarManagementApp/zbjjtuykys6vxyjkyqox.jpg" alt="Car Logo" className="w-14 h-auto rounded-full" />
                            <h1 className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-teal-400">
                                Car Management App
                            </h1>
                        </a>
                    </div>
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900" href="/">Home</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900" href="/create">Create</a>
                        {isLoggedIn ? (<a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900" href="/mycars">My Cars</a>) : <></>}
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        {isLoggedIn ? (
                            <>
                                <span className="hidden sm:inline-block text-sm font-medium text-gray-900">Hi, {username}</span>
                                <button onClick={handleLogout} className="inline-flex items-center justify-center rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-400">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50" href="/SignUp">Sign Up</a>
                                <a className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="/login">Login</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
