import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const grammarTopics = {
  A1: ["Verb to be", "Articles"],
  A2: ["Past Simple", "Countable vs Uncountable"],
  B1: ["Present Perfect", "Conditionals"],
  B2: ["Passive Voice", "Reported Speech"],
  C1: ["Inversion", "Advanced Modals"],
  C2: ["Cleft Sentences", "Nominalization"],
};

const exerciseExamples = {
  "Verb to be": {
    cloze: "I ___ a student. (am)",
    fill: "She ____ happy. → (is)",
  },
  "Articles": {
    cloze: "I saw ___ elephant at the zoo. (an)",
    fill: "He bought ____ apple. → (an)",
  },
  "Past Simple": {
    cloze: "They ___ to the store yesterday. (went)",
    fill: "She ____ a new dress. → (bought)",
  },
  "Conditionals": {
    cloze: "If it rains, I ___ stay home. (will)",
    fill: "If you ____ harder, you'll pass. → (study)",
  },
};

export default function Exercises() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const currentExercise =
    selectedTopic && selectedType
      ? exerciseExamples[selectedTopic]?.[selectedType]
      : null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Exercises</h2>

      {/* Níveis */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(grammarTopics).map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => {
              setSelectedLevel(level);
              setSelectedTopic(null);
              setSelectedType(null);
            }}
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Tópicos */}
      {selectedLevel && (
        <div>
          <h3 className="text-xl font-semibold">Topics for {selectedLevel}</h3>
          <div className="flex gap-2 flex-wrap mt-2">
            {grammarTopics[selectedLevel].map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                onClick={() => {
                  setSelectedTopic(topic);
                  setSelectedType(null);
                }}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Tipo de exercício */}
      {selectedTopic && (
        <div className="flex gap-2 mt-4">
          <Button
            variant={selectedType === "cloze" ? "default" : "outline"}
            onClick={() => setSelectedType("cloze")}
          >
            Cloze
          </Button>
          <Button
            variant={selectedType === "fill" ? "default" : "outline"}
            onClick={() => setSelectedType("fill")}
          >
            Fill in the blank
          </Button>
        </div>
      )}

      {/* Card com exercício */}
      {currentExercise && (
        <Card className="mt-4">
          <CardContent className="p-4 space-y-2">
            <h4 className="text-lg font-semibold">
              {selectedTopic} ({selectedType})
            </h4>
            <p>{currentExercise}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
