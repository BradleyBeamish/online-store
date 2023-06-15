import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className=" bg-gray-100 py-4 z-50 sticky top-0 w-full">
            <div className="flex space-x-4 justify-center">
                <Link
                    to="/"
                    className="text-gray-800 hover:text-gray-600 hover:underline"
                >
                    Home
                </Link>
                <Link
                    to="/create-listing"
                    className="text-gray-800 hover:text-gray-600 hover:underline"
                >
                    Create
                </Link>
                <Link
                    to="/my-profile"
                    className="text-gray-800 hover:text-gray-600 hover:underline"
                >
                    Profile
                </Link>
                <Link
                    to="auth/login"
                    className="text-gray-800 hover:text-gray-600 hover:underline"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};
