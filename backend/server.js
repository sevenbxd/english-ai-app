// server.js

// 1. Carregue as variáveis de ambiente primeiro
import dotenv from "dotenv";
dotenv.config();

// 2. Importe todas as bibliotecas necessárias
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import lessonRoutes from "./routes/lesson.js";
import aiRoutes from "./routes/ai.js";

const app = express();
app.use(cors());
app.use(express.json());

// 3. Configure as rotas da sua aplicação
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/ai", aiRoutes);

// 4. Conecte-se ao banco de dados e inicie o servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));