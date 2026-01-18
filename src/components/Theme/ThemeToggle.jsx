import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setDark(!dark)}
        className="px-4 py-2 rounded-lg border bg-white shadow hover:bg-gray-100 transition"
      >
        {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default ThemeToggle;
