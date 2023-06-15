import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TbLocation } from "react-icons/tb";
import { useGetUsername } from "../hooks/useGetUsername";
import { useGetListings } from "../hooks/useGetListings";

// Displays user's name, all their listings, and a way to delete them
export const Profile = () => {
    const username = useGetUsername();
    const listings = useGetListings();

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3001/my-profile/delete?listingID=${id}`
            );
            console.log("Listing deleted successfully.");
        } catch (error) {
            console.error("Could not Delete Listing");
        }
        window.location.reload();
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
                    to View your Profile
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-xl text-center pt-4 pb-0">{username}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2">
                {listings.map((listing) => (
                    <div key={listing._id} className="text-center">
                        <div className="bg-slate-300 rounded-xl p-4 space-y-2 flex h-96 m-4">
                            <div className="w-1/2 space-y-2 flex flex-col justify-center items-center">
                                <h1 className="text-xl">
                                    <b>{listing.title}</b>
                                </h1>
                                <span className="flex items-center justify-center">
                                    {listing.price}$
                                </span>
                                <p className="text-sm">
                                    <span className="flex items-center justify-center">
                                        <TbLocation
                                            size={16}
                                            className="mr-1"
                                        />{" "}
                                        {listing.location}
                                    </span>
                                </p>
                                <p className="text-sm">{listing.description}</p>
                                <button
                                    onClick={() => handleDelete(listing._id)}
                                    className="bg-slate-200 rounded-lg p-1 hover:bg-slate-100"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <img
                                    src={listing.imageURL}
                                    alt={listing.title}
                                    className="max-w-56 max-h-56 mx-auto block rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
