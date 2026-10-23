import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET is missing in .env");

export const env = {
    port: process.env.PORT || 3000,
    jwtSecret,
    frontUrl: process.env.FRONT_URL || "http://localhost:5173",
};