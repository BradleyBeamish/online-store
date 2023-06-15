import express from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersModel } from "./usersModel.js";

const router = express.Router();

// Create a new user using info from the request, then save to the DB
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UsersModel({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

// Find user that matches details, compare passwords, set web token
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UsersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, "secret");

        res.status(200).json({ token, userID: user._id });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});

export { router as AuthRouter };
