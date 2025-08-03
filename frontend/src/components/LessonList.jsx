import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select"; // Se você criou esse select

export default function LessonList() {
  const [lessons, setLessons] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [level, setLevel] = useState("iniciante");
  const [loading, setLoading] = useState(false);

  // ✅ Mantido fora do useEffect
  const fetchLessons = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/lessons");
      const data = await res.json();
      console.log("📘 Lições carregadas:", data);
      setLessons(data.lessons || []);
    } catch (err) {
      console.error("Erro ao buscar lições:", err);
    }
  };

  // ✅ useEffect apenas chama fetchLessons
  useEffect(() => {
    fetchLessons();
  }, []);

  const handleGenerateLesson = async () => {
    if (!newTopic.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/generate-lesson", {
        topic: newTopic,
        level,
      });
      console.log("🟢 Lição gerada com sucesso:", res.data);
      setNewTopic("");
      fetchLessons(); // 🔁 Recarrega a lista após gerar
    } catch (err) {
      console.error("🔴 Erro ao gerar lição:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lições Disponíveis</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Digite um tópico (ex: past simple)"
        />
        <Select value={level} onValueChange={setLevel}>
          <SelectItem value="iniciante">Iniciante</SelectItem>
          <SelectItem value="intermediário">Intermediário</SelectItem>
          <SelectItem value="avançado">Avançado</SelectItem>
        </Select>
        <Button onClick={handleGenerateLesson} disabled={loading}>
          {loading ? "Gerando..." : "Gerar Lição"}
        </Button>
      </div>

      {lessons.length === 0 ? (
        <p>Nenhuma lição disponível.</p>
      ) : (
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson._id} className="p-3 bg-white shadow rounded">
              <strong>{lesson.title} ({lesson.level})</strong>
              <p className="mt-1 whitespace-pre-line">{lesson.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
