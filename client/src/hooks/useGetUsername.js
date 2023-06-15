import { useEffect, useState } from "react";
import axios from "axios";

// Makes request to backend that returns the name of the user cuurently logged in
export const useGetUsername = () => {
    const userID = window.localStorage.getItem("userID");
    const [username, setUsername] = useState("");

    const fetchUsername = async () => {
        try {
            if (userID) {
                const response = await axios.get(
                    `http://localhost:3001/my-profile/find-name?userID=${userID}`
                );
                setUsername(response.data.username);
            } else {
                setUsername(""); // User is not logged in
            }
        } catch (error) {
            console.error("Error Finding Username:", error);
        }
    };

    useEffect(() => {
        fetchUsername();
    }, []);

    return username;
};
