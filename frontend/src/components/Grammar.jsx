import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const grammarTopics = {
  A1: ["Verb to be", "Articles", "Possessive adjectives"],
  A2: ["Past Simple", "Countable vs Uncountable", "Comparatives"],
  B1: ["Present Perfect", "Modals", "Conditionals (Zero, First)"],
  B2: ["Passive Voice", "Reported Speech", "Relative Clauses"],
  C1: ["Mixed Conditionals", "Advanced Modals", "Inversion"],
  C2: ["Nominalization", "Ellipsis", "Cleft Sentences"],
};

const exampleContent = {
  "Verb to be": "The verb 'to be' in the present simple is: I am, You are, He/She/It is, We are, They are...",
  "Articles": "We use 'a' and 'an' for non-specific items, and 'the' for specific ones...",
  "Possessive adjectives": "'My', 'your', 'his', 'her', 'our', 'their' show possession and come before nouns...",
  // Adicione mais se quiser
};

export default function Grammar() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Grammar Levels</h2>

      {/* Botões de nível */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(grammarTopics).map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => {
              setSelectedLevel(level);
              setSelectedTopic(null);
            }}
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Lista de tópicos */}
      {selectedLevel && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Topics for {selectedLevel}</h3>
          <div className="flex gap-2 flex-wrap">
            {grammarTopics[selectedLevel].map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Card com explicação */}
      {selectedTopic && (
        <Card className="mt-4">
          <CardContent className="p-4 space-y-2">
            <h4 className="text-lg font-semibold">{selectedTopic}</h4>
            <p>{exampleContent[selectedTopic] || "Content coming soon..."}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
