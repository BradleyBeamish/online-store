import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGetUsername } from "../hooks/useGetUsername";
import { useGetEmail } from "../hooks/useGetEmail";

// Uses a form to collect data then sends to backend for a listing to be created
export const Create = () => {
    const _userID = window.localStorage.getItem("userID");
    const [title, setTitle] = useState("");
    const username = useGetUsername();
    const email = useGetEmail();
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/create-listing/new", {
                _userID,
                title,
                username,
                email,
                price,
                location,
                description,
                imageURL,
            });

            console.log("Listing created successfully!");
            alert("Listing created successfully!");
        } catch (error) {
            console.log("Could not Create Listing.");
            alert("Could not Create Listing.");
        }

        setTitle("");
        setPrice("");
        setLocation("");
        setDescription("");
        setImageURL("");
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
                    to Create a Listing
                </p>
                ;
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="w-5/6 md:w-4/5 lg:w-3/4 xl:w-1/2">
                <h1 className="text-xl text-center m-4">Create Listing</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-300 rounded-xl p-4"
                >
                    <label>
                        <input
                            placeholder="Title"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            id="title-input"
                            name="title"
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            required
                            id="price-input"
                            name="price"
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            placeholder="Location"
                            type="text"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            required
                            id="location-input"
                            name="location"
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            required
                            id="description-input"
                            name="description"
                            className="p-2 mb-2 rounded-lg bg-white bg-opacity-20 w-full"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            placeholder="Image URL"
                            type="text"
                            value={imageURL}
                            onChange={(event) =>
                                setImageURL(event.target.value)
                            }
                            required
                            id="image-input"
                            name="imageurl"
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
