import { useEffect, useState } from "react";
import axios from "axios";

// Returns all the listings data for a user, to be displayed in profile
export const useGetListings = () => {
    const userID = window.localStorage.getItem("userID");
    const [listings, setListings] = useState([]);

    const fetchListings = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/my-profile/find-listings?userID=${userID}`
            );

            setListings(response.data);
        } catch (error) {
            console.error("Error Finding Username:", error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return listings;
};
