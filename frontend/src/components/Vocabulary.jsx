import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const vocabularyData = {
  A1: [
    {
      word: "apple",
      meaning: "A round fruit with red or green skin.",
      example: "I eat an apple every day.",
      translation: "maçã",
    },
    {
      word: "book",
      meaning: "A set of pages bound together.",
      example: "This book is interesting.",
      translation: "livro",
    },
  ],
  B1: [
    {
      word: "achieve",
      meaning: "To succeed in doing something good.",
      example: "He achieved his goal.",
      translation: "alcançar / conquistar",
    },
  ],
  // Adicione mais níveis e palavras conforme desejar
};

export default function Vocabulary() {
  const [level, setLevel] = useState("A1");
  const [words, setWords] = useState(vocabularyData[level]);
  const [index, setIndex] = useState(0);

  function handleFeedback(type) {
    const currentWord = words[index];

    if (type === "duvida") {
      // Reinserir logo após 2 palavras
      const newWords = [...words];
      newWords.splice(index + 2, 0, currentWord);
      setWords(newWords);
    } else if (type === "pouco") {
      const newWords = [...words, currentWord]; // final
      setWords(newWords);
    } else if (type === "entendi") {
      // nada acontece, segue
    } else if (type === "decorei") {
      const newWords = words.filter((_, i) => i !== index);
      setWords(newWords);
      setIndex((prev) => (prev >= newWords.length ? 0 : prev));
      return;
    }

    setIndex((prev) => (prev + 1 >= words.length ? 0 : prev + 1));
  }

  function changeLevel(lvl) {
    setLevel(lvl);
    setWords(vocabularyData[lvl] || []);
    setIndex(0);
  }

  const current = words[index];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Vocabulary - Level {level}</h2>

      <div className="flex gap-2">
        {Object.keys(vocabularyData).map((lvl) => (
          <Button
            key={lvl}
            onClick={() => changeLevel(lvl)}
            variant={level === lvl ? "default" : "outline"}
          >
            {lvl}
          </Button>
        ))}
      </div>

      {current ? (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">{current.word}</h3>
            <p className="text-sm text-muted-foreground">Tradução: {current.translation}</p>
            <p className="mt-2">{current.meaning}</p>
            <p className="italic mt-1">Ex: {current.example}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={() => handleFeedback("duvida")} variant="destructive">
                ❓ Dúvida
              </Button>
              <Button onClick={() => handleFeedback("pouco")} variant="secondary">
                🟡 Pouco
              </Button>
              <Button onClick={() => handleFeedback("entendi")} variant="outline">
                ✅ Entendi
              </Button>
              <Button onClick={() => handleFeedback("decorei")} variant="default">
                🧠 Decorei
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>Fim das palavras. Selecione outro nível!</p>
      )}
    </div>
  );
}
