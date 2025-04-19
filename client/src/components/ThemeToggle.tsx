import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const themes = ["light", "dark"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <div className="inline-flex items-center p-[1px] rounded-3xl bg-zinc-300 dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-500 hover:border-green-300 transition-all duration-300">
      {themes.map((t) => {
        const checked = t === theme;
        return (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            key={t}
            className={`${
              checked
                ? "bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
                : ""
            } cursor-pointer rounded-3xl p-1`}
          >
            {t === "light" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        );
      })}
    </div>
  );
}
