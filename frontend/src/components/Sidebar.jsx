import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar({ setPage }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/auth");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-lg font-bold border-b border-gray-600">
          Hello, {username || "User"}
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <button onClick={() => setPage("grammar")}>Grammar</button>
          <button onClick={() => setPage("vocabulary")}>Vocabulary</button>
          <button onClick={() => setPage("exercises")}>Exercises</button>
          <button onClick={() => setPage("test")}>Test</button>
          <button onClick={() => setPage("lessons")}>Lessons</button>
          <button onClick={() => setPage("settings")}>User Settings</button>
        </nav>
      </div>

      <div className="p-4">
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}
