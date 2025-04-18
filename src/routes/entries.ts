import { Hono } from "hono";
import { journalCollection } from "../db";
import { Entry } from "../lib/entry";

const entry = new Hono();

// Get all entries
entry.get("/", async (c) => {
  const entries = await journalCollection.find().toArray();
  return c.json(entries);
});

// Create entry
entry.post("/", async (c) => {
  const body = await c.req.json();
  const result = await journalCollection.insertOne({
    ...body,
    createdAt: new Date(),
  });
  return c.json({ success: true, id: result.insertedId });
});

export default entry;
