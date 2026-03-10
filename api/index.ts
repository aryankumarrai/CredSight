import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// In Vercel, we just need to export the app. 
// Routes are registered, but we don't call .listen()
registerRoutes(httpServer, app).catch(console.error);

export default app;
