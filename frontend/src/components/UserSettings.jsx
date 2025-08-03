import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserSettings() {
  // Simula dados do usuário (futuramente virá do backend)
  const username = "sevenbxd";
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Aqui você pode integrar com backend para salvar
    console.log("API Key saved:", apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Settings</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label className="font-semibold">Username</Label>
            <p className="text-muted-foreground">{username}</p>
          </div>

          <div>
            <Label htmlFor="apiKey" className="font-semibold">
              OpenAI API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>

          <Button onClick={handleSave}>Save</Button>
          {saved && <p className="text-green-600 text-sm">Saved successfully!</p>}
        </CardContent>
      </Card>
    </div>
  );
}
