import express from "express";
import Lesson from "../models/Lesson.js";

const router = express.Router();

// GET todas as lições
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar lições" });
  }
});

// POST nova lição
router.post("/", async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar lição" });
  }
});

export default router;
