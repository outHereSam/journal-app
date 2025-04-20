import axios from "axios";
import { useEffect, useState } from "react";
import { EntryType } from "../lib/EntryType";
import { Link } from "react-router";

export default function Sidebar() {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/entries");
        setEntries(response.data);
      } catch (error) {
        setError("Failed to fetch entries");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <aside>Loading entries...</aside>;
  if (error) return <aside>{error}</aside>;

  return (
    <aside>
      <h2>Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            <Link to={`/${entry._id}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
