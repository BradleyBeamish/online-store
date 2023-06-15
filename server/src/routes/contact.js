import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Send email using nodemailer (Does not work with gmail due to recent updates)
router.post("/send", async (req, res) => {
    try {
        const { to, from, subject, text, service, password } = req.body;

        var transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: from,
                pass: password,
            },
        });

        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error Sending Email" });
    }
});

export { router as ContactRouter };
