import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TbLocation } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";

// Shows all listings sorted from new -> old, allows users to search for listings
export const Home = () => {
    const [selectedListing, setSelectedListing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (listing) => {
        setSelectedListing(listing);
        setIsModalOpen(true);
    };

    const [listings, setListings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleContact = async (email) => {
        navigate(`/contact?email=${email}`);
    };

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/search?query=${searchQuery}`
            );

            setListings(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get("http://localhost:3001/");
                setListings(response.data);
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
        } else {
            fetchListings();
        }
    }, [searchQuery]);

    return (
        <div>
            <div className="flex justify-center m-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                />
            </div>
            {listings.map((listing) => (
                <div key={listing._id} className="text-center max-w-xl mx-auto">
                    <div className="bg-slate-300 rounded-xl m-4 p-4 flex">
                        <div className="w-1/2 flex flex-col justify-center items-center space-y-1">
                            <h1 className="text-lg">
                                <b>{listing.title}</b>
                            </h1>
                            <p className="text-sm">
                                <span className="flex items-center justify-center">
                                    <BiUserCircle size={25} className="mr-1" />{" "}
                                    {listing.username}
                                </span>
                            </p>
                            <span className="flex items-center justify-center">
                                {listing.price}$
                            </span>
                            <p className="text-sm">
                                <span className="flex items-center justify-center">
                                    <TbLocation size={16} className="mr-1" />{" "}
                                    {listing.location}
                                </span>
                            </p>
                            <button
                                onClick={() => openModal(listing)}
                                className="bg-slate-200 rounded-lg p-1 hover:bg-slate-100"
                            >
                                More Details
                            </button>
                        </div>
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            <img
                                src={listing.imageURL}
                                alt="ListingImage"
                                className="max-w-56 max-h-56 mx-auto block rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {isModalOpen && selectedListing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
                    <div className="bg-white p-4 rounded-xl w-3/4">
                        <h1 className="text-xl">
                            <strong>{selectedListing.title}</strong>
                        </h1>
                        <p>
                            <span className="flex">
                                <BiUserCircle size={25} className="mr-1" />{" "}
                                {selectedListing.username}
                            </span>
                        </p>
                        <p>{selectedListing.price}$</p>
                        <p>
                            <span className="flex">
                                <TbLocation size={16} className="mr-1 mt-1" />{" "}
                                {selectedListing.location}
                            </span>
                        </p>
                        <br />
                        <p className="underline">Description:</p>
                        <p>{selectedListing.description}</p>
                        <br />
                        <img
                            src={selectedListing.imageURL}
                            alt="ListingImage"
                            className="max-w-56 max-h-56 mx-auto block"
                        />
                        <button
                            onClick={() => handleContact(selectedListing.email)}
                            className="float-left hover:underline"
                        >
                            Contact
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="float-right hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
