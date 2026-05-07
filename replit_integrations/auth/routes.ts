import type { Express } from "express";
export { setupAuth, isAuthenticated } from "./replitAuth";
export function registerAuthRoutes(app: Express): void {}
