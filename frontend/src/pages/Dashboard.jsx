// src/pages/Dashboard.jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Grammar from "@/components/Grammar";
import Vocabulary from "@/components/Vocabulary";
import Exercises from "@/components/Exercises";
import Test from "@/components/Test";
import UserSettings from "@/components/UserSettings";
import LessonList from "@/components/LessonList"; // ✅ importante

export default function Dashboard() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState("");

  // Atualiza o estado quando a query mudar
  useEffect(() => {
    const currentPage = params.get("page") || "grammar";
    setPage(currentPage);
  }, [params]);

  const renderPage = () => {
    switch (page) {
      case "grammar":
        return <Grammar />;
      case "vocabulary":
        return <Vocabulary />;
      case "exercises":
        return <Exercises />;
      case "test":
        return <Test />;
      case "settings":
        return <UserSettings />;
      case "lessons":
        return <LessonList />; // ✅ precisa existir e estar bem importado
      default:
        return <Grammar />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setPage={(p) => setParams({ page: p })} />
      <main className="flex-1 p-4 overflow-auto bg-gray-50">
        {page ? renderPage() : <p>Loading...</p>}
      </main>
    </div>
  );
}
