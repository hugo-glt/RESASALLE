import bcrypt from "bcrypt";
import { describe, it, expect } from "@jest/globals";

describe("UserService", () => {
    describe("register", () => {
        it("should hash password before saving", async () => {
            const hash = await bcrypt.hash("secret123", 10);
            expect(hash).not.toBe("secret123");
            expect(hash).toContain("$2b$10$");
        });
    });

    describe("login", () => {
        it("should throw for invalid email", () => {
        });
    });
});