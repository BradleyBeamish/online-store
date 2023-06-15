import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

// Allows user to log in / logout
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setCookies] = useCookies(["access_token"]);
    const isLoggedIn = localStorage.getItem("userID");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userID");
        console.log("Logged Out!");
        navigate("/auth/login");
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/auth/login",
                {
                    email,
                    password,
                }
            );

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);

            console.log("You are now Logged In!");
            alert("You are now Logged In!");
        } catch (error) {
            console.log("The login details entered are incorrect");
            alert("The login details entered are incorrect");
        }

        setEmail("");
        setPassword("");
    };

    if (isLoggedIn) {
        return (
            <div>
                <div className="text-center text-xl space-y-2 m-4">
                    <h1>You are Logged In!</h1>
                    <Link
                        to="/auth/login"
                        className="text-gray-800 hover:text-gray-600 hover:underline flex justify-center"
                        onClick={handleLogout}
                    >
                        Want to Logout?
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-xl text-center m-4">Login</h1>
                    <form
                        onSubmit={handleLogin}
                        className="bg-slate-300 rounded-xl p-4"
                    >
                        <label>
                            <input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                                id="email-input"
                                name="email"
                                className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                            />
                        </label>
                        <br />
                        <label>
                            <input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                                id="password-input"
                                name="password"
                                className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                            />
                        </label>
                        <br />
                        <button
                            type="submit"
                            className="p-2 underline bg-white bg-opacity-40 rounded-lg hover:bg-opacity-70"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <Link
                    to="/auth/register"
                    className="text-gray-800 hover:text-gray-600 hover:underline flex justify-center m-2"
                >
                    Don't have an account?
                </Link>
            </div>
        </div>
    );
};
