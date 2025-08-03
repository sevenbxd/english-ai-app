// routes/ai.js
import express from "express";
import Lesson from "../models/Lesson.js";
import { genAI } from "../gemini.js";

const router = express.Router();

router.post("/generate-lesson", async (req, res) => {
  // Receba também o 'level' do corpo da requisição
  const { topic, level } = req.body;

  // Adicione uma verificação para 'level'
  if (!topic || !level) {
    return res.status(400).json({ message: "Tópico e nível são obrigatórios." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Crie um prompt mais completo, incluindo o nível
    const prompt = `Crie uma lição curta de inglês para alunos de nível ${level} sobre o tema "${topic}". Inclua uma explicação simples e um exemplo.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Preencha todos os campos obrigatórios do modelo
    const newLesson = new Lesson({ 
      title: topic, 
      level, // O nível que você recebeu
      topic, // O tópico que você recebeu
      content 
    });
    await newLesson.save();

    res.status(201).json(newLesson);
  } catch (err) {
    console.error("Erro ao gerar lição:", err);
    res.status(500).json({ message: "Erro ao gerar lição" });
  }
});

export default router;