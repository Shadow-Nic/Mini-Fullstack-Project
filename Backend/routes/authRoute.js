import express from "express";
import { verifyJwt } from "../helpers/jwt.js";

const router = express.Router();


router.get("/login", (req, res) => {
    const token = req.cookies._auth;
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = verifyJwt(token);
        res.status(200).json({
            token: token,
            username: decoded.username,
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid or expired token",
        });
    }
});


export default router;