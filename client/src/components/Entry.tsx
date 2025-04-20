import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EntryType } from "../lib/EntryType";
import axios from "axios";

export default function Entry() {
  const { entryId } = useParams();
  const [entry, setEntry] = useState<EntryType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/entries/${entryId}`
        );
        setEntry(response.data);
      } catch (error) {
        setError("Error fetching entry");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [entryId]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading entry...</div>;

  return (
    <div>
      <h1>{entry?.title}</h1>
      <p>{entry?.content}</p>
    </div>
  );
}
