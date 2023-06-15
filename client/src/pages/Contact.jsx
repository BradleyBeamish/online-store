import React, { useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useGetEmail } from "../hooks/useGetEmail";
import { useGetUsername } from "../hooks/useGetUsername";

// A contact form to send a email to the owner of a listing
export const Contact = () => {
    const location = useLocation();
    const username = useGetUsername();
    const searchParams = new URLSearchParams(location.search);

    const from = useGetEmail();
    const to = searchParams.get("email");
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");
    const [service, setService] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/contact/send", {
                to,
                from,
                subject,
                text,
                service,
                password,
            });

            console.log("Email has been Sent!");
            alert("Email has been Sent!");
        } catch (error) {
            console.log("Could Not Send Message.");
            alert("Could not Send Message.");
        }

        setSubject("");
        setText("");
        setPassword("");
        setService("");
    };

    const isLoggedIn = Boolean(username);

    if (!isLoggedIn) {
        return (
            <div>
                <p className="text-center text-xl flex justify-center m-4">
                    You Must
                    <Link
                        to="/auth/login"
                        className="text-cyan-800 hover:underline px-1"
                    >
                        Log In
                    </Link>
                    to Send a Message
                </p>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2">
                <h1 className="text-xl m-4 text-center">Send Email</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-300 rounded-xl p-4"
                >
                    <label>
                        {" "}
                        From:
                        <input
                            value={from}
                            disabled
                            required
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full text-slate-400"
                        />
                    </label>
                    <br />
                    <label>
                        {" "}
                        To:
                        <input
                            value={to}
                            disabled
                            required
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full text-slate-400"
                        />
                    </label>
                    <br />

                    <label>
                        {" "}
                        Subject:
                        <input
                            type="text"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            required
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        {" "}
                        Message:
                        <input
                            type="text"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            required
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        {" "}
                        Service:
                        <input
                            type="text"
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                            required
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        {" "}
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
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
    );
};
