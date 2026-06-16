import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
    (req as any).user = jwt.verify(token, env.jwtSecret!);
    next();
    } catch {
    return res.status(403).json({ message: "Invalid token" });
}
}