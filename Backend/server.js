import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import Mongoose from "./services/mongoose.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js"
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import config from "./config/config.js";

Mongoose.connect();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clientUrl = `http://localhost:${config.port}`;

// Middleware stack
app.use(
    cors({
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

// Middleware routes
app.use("/app/user", userRoute);
app.use("/auth", authRoute)

// !! Your middleware should not go below this line !!
// Serve frontend client/build folder
const clientPath = path.join(__dirname, "..", "Mini-Fullstack", "dist");
app.use(express.static(clientPath));
app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(config.port, () => {
    console.log(`The server 🙈 is listening on port ${config.port}`);
    console.log(`Visit ${clientUrl} in your browser`);
});
