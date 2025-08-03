import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
     const apiBase = import.meta.env.VITE_API_URL;
     const url = isLogin ? `${apiBase}/api/auth/login` : `${apiBase}/api/auth/register`;
     const data = isLogin ? { username: form.username, password: form.password } : form;

      const res = await axios.post(url, data);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
      } else {
        alert("Usuário criado com sucesso! Faça login.");
        setIsLogin(true);
        return;
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Erro no servidor");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-96">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Registro"}</h2>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            {!isLogin && (
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <button
            onClick={() => {
              setError("");
              setIsLogin(!isLogin);
            }}
            className="mt-4 text-sm underline text-blue-600 hover:text-blue-800"
          >
            {isLogin ? "Criar uma conta" : "Já tem conta? Faça login"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
