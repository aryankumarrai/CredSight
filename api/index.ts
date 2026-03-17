import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

let routesRegistered = false;

async function ensureRoutes() {
  if (!routesRegistered) {
    await registerRoutes(httpServer, app);
    routesRegistered = true;
  }
}

const handler = async (req: any, res: any) => {
  await ensureRoutes();
  app(req, res);
};

export default handler;
