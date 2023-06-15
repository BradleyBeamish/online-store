import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ListingsRouter } from "./routes/home.js";
import { CreateRouter } from "./routes/create-listing.js";
import { AuthRouter } from "./routes/auth.js";
import { ProfileRouter } from "./routes/profile.js";
import { ContactRouter } from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(express.json()); // Makes JSON data accessible in req.body
app.use(cors()); // Handles cross-origin resource sharing

// ROUTES
app.use("/", ListingsRouter);
app.use("/create-listing/", CreateRouter);
app.use("/auth/", AuthRouter);
app.use("/my-profile/", ProfileRouter);
app.use("/contact/", ContactRouter);

mongoose.connect(process.env.MONGO_KEY); // Connect to MongoDB

app.listen(3001, () => {
    console.log("Server Started");
});
