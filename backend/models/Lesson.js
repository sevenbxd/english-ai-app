import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true }, // Ex: "Present Perfect"
    level: { type: String, required: true }, // Ex: "A2", "B1", "B2"
    content: { type: String, required: true }, // Texto explicativo
    examples: [String], // Frases de exemplo
    exercises: [
      {
        question: String,
        answer: String,
        type: { type: String, default: "fill-in-the-blank" }, // opcional
      },
    ],
    language: { type: String, default: "en" }, // Para expandir no futuro
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
