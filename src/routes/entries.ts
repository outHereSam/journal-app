import { Hono } from "hono";
import { journalCollection } from "../db";
import { Entry } from "../lib/entry";
import { uploadToS3 } from "../lib/s3service";
import { ObjectId } from "mongodb";

const entry = new Hono();

// Get all entries
entry.get("/", async (c) => {
  const entries = await journalCollection.find().toArray();
  return c.json(entries);
});

// Get a single entry
entry.get("/:entryId", async (c) => {
  const id = c.req.param("entryId");

  try {
    const entry = await journalCollection.findOne({ _id: new ObjectId(id) });

    if (!entry) {
      return c.json({ message: "Entry not found" }, 404);
    }

    return c.json(entry);
  } catch (error) {
    return c.json({ message: "Invalid ID" }, 400);
  }
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
