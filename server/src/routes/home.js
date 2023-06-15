import express from "express";
import { ListingsModel } from "./listingsModel.js";

const router = express.Router();

// Returns response of all listings
router.get("/", async (req, res) => {
    try {
        const result = await ListingsModel.find({}).sort({ _id: -1 }); // Newest -> Oldest
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Returns response of all listings that match the search query
router.get("/search", async (req, res) => {
    const searchQuery = req.query.query;

    try {
        const searchResults = await ListingsModel.find({
            title: { $regex: searchQuery, $options: "i" }, // Case-insensitive
        }).sort({ _id: -1 }); // Newest -> Oldest

        res.status(200).json(searchResults);
    } catch (err) {
        res.status(500).json(err);
    }
});

export { router as ListingsRouter };
