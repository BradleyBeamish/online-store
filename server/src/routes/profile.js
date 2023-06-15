import express from "express";
import { UsersModel } from "./usersModel.js";
import { ListingsModel } from "./listingsModel.js";

const router = express.Router();

// Finds name of the user that is currently logged in
router.get("/find-name", async (req, res) => {
    const { userID } = req.query;

    try {
        const user = await UsersModel.findById(userID);

        if (!user) {
            return res.status(404).json({ error: "User not Found" });
        }

        res.json({ username: user.username });
    } catch (error) {
        res.status(500).json({ error: "Could not find name" });
    }
});

// Used to delete a users listing in their profile
router.delete("/delete", async (req, res) => {
    const { listingID } = req.query;

    try {
        const deletedListing = await ListingsModel.findByIdAndDelete(listingID);

        if (!deletedListing) {
            return res.status(404).json({ error: "Listing not found" });
        }

        res.status(200).json({ message: "Listing Deleted Successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error deleting listing." });
    }
});

// Returns all listings created by the user logged in
router.get("/find-listings", async (req, res) => {
    const { userID } = req.query;

    try {
        const listings = await ListingsModel.find({ _userID: userID });
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json(err);
    }
});

export { router as ProfileRouter };
