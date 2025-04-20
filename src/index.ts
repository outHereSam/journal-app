import { config } from "dotenv";
config();

import { Hono } from "hono";
import { cors } from "hono/cors";
import entries from "./routes/entries";

const app = new Hono();

app.use("/api/*", cors());

app.route("/api/entries", entries);

export default app;
