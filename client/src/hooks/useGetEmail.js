import { useEffect, useState } from "react";
import axios from "axios";

// Finds user that is logged in, makes request to backend, email for used is returned
export const useGetEmail = () => {
    const userID = window.localStorage.getItem("userID");
    const [email, setEmail] = useState("");

    const fetchEmail = async () => {
        try {
            if (userID) {
                const response = await axios.get(
                    `http://localhost:3001/create-listing/find-email?userID=${userID}`
                );
                setEmail(response.data.email);
            } else {
                setEmail(""); // User is not logged in
            }
        } catch (error) {
            console.error("Error Finding Email:", error);
        }
    };

    useEffect(() => {
        fetchEmail();
    }, []);

    return email;
};
