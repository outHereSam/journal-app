import { config } from "dotenv";
config();

import { Hono } from "hono";
import entries from "./routes/entries";

const app = new Hono();

app.route("/api/entries", entries);

export default app;
