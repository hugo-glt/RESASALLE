import type { NextFunction, Request, Response } from "express";

export const requireRole =
    (...roles: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as { role?: string } | undefined;

        if (!user) {
            return res.status(401).json({ message: "Authentication required" });
        }
        if (!user.role || !roles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };