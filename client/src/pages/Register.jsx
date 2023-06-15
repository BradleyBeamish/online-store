import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Allows users to create an account
export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                email,
                password,
            });

            console.log("You are now Registered!");
            alert("You are now Registered!");

            navigate("/auth/login");
        } catch (error) {
            console.log("Could Not Register.");
            alert("Could Not Register.");
        }

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2">
                    <h1 className="text-xl text-center m-4">Register</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-slate-300 rounded-xl p-4 m-4"
                    >
                        <label>
                            <input
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                required
                                id="username-input"
                                name="username"
                                className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                            />
                        </label>
                        <br />
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
        </div>
    );
};
