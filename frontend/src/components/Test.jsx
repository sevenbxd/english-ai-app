import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup";
import { Label } from "@/components/ui/label";

const questionsByLevel = {
  A1: [
    {
      question: "What is the correct form of 'to be' for 'I'?",
      options: ["is", "are", "am", "be"],
      answer: "am",
    },
    {
      question: "Choose the correct article: ___ apple",
      options: ["a", "an", "the", "no article"],
      answer: "an",
    },
    // ...adicione mais perguntas aqui se quiser
  ],
  B1: [
    {
      question: "I have ___ finished my homework.",
      options: ["yet", "already", "since", "for"],
      answer: "already",
    },
    {
      question: "If I had time, I ___ go with you.",
      options: ["will", "would", "can", "may"],
      answer: "would",
    },
  ],
  // Adicione B2, C1, C2 conforme necessário
};

export default function Test() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = selectedLevel ? questionsByLevel[selectedLevel] || [] : [];

  const handleSelect = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = questions.reduce((acc, q, idx) => {
    return answers[idx] === q.answer ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Grammar Test</h2>

      {/* Níveis */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(questionsByLevel).map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => {
              setSelectedLevel(level);
              setAnswers({});
              setSubmitted(false);
            }}
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Perguntas */}
      {selectedLevel && (
        <div className="space-y-4 mt-4">
          {questions.map((q, index) => (
            <Card key={index}>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">{index + 1}. {q.question}</p>
                <RadioGroup
                  onValueChange={(val) => handleSelect(index, val)}
                  value={answers[index] || ""}
                  disabled={submitted}
                >
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt} id={`${index}-${i}`} />
                      <Label htmlFor={`${index}-${i}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {/* Botão de envio */}
          {!submitted && (
            <Button onClick={handleSubmit}>Submit Test</Button>
          )}

          {/* Resultado */}
          {submitted && (
            <div className="text-lg font-semibold">
              You scored {score} out of {questions.length}.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
