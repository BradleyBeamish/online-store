import express from "express";
import { ListingsModel } from "./listingsModel.js";
import { UsersModel } from "./usersModel.js";

const router = express.Router();

// Creates a new listing, saves to DB
router.post("/new", async (req, res) => {
    try {
        const {
            _userID,
            title,
            username,
            email,
            price,
            location,
            description,
            imageURL,
        } = req.body;

        const newListing = new ListingsModel({
            _userID,
            title,
            username,
            email,
            price,
            location,
            description,
            imageURL,
        });

        const savedListing = await newListing.save();

        res.status(201).json(savedListing);
    } catch (error) {
        res.status(500).json({ error: "Error creating listing" });
    }
});

// Finds email of user currently logged in, used later to connect the users email to the listing
router.get("/find-email", async (req, res) => {
    const { userID } = req.query;

    try {
        const listings = await UsersModel.findOne({ _id: userID });
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json(err);
    }
});

export { router as CreateRouter };
