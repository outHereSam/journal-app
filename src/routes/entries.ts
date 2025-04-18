import { Hono } from "hono";
import { journalCollection } from "../db";
import { Entry } from "../lib/entry";
import { uploadToS3 } from "../lib/s3service";

const entry = new Hono();

// Get all entries
entry.get("/", async (c) => {
  const entries = await journalCollection.find().toArray();
  return c.json(entries);
});

// Create entry
entry.post("/", async (c) => {
  const form = await c.req.formData();

  const title = form.get("title") as string;
  const mood = form.get("mood") as string;
  const content = form.get("content") as string;
  const files = form.getAll("files") as File[];

  const attachments = await Promise.all(
    files.map(async (file) => ({
      name: file.name,
      type: file.type,
      url: await uploadToS3(file),
    }))
  );

  await journalCollection.insertOne({
    title,
    mood,
    content,
    createdAt: new Date(),
    attachments,
  });

  return c.text("Journal entry saved");
});

export default entry;
