"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import fundoLogin from "../../imagens/fundo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
  
    console.log("Iniciando tentativa de login...");
    console.log("Endpoint: http://localhost:3001/usuarios/login");
    console.log("Email enviado:", email);
  
    try {
      // Faz a chamada para a API de login
      const response = await axios.post("http://localhost:3001/usuarios/login", {
        email,
        senha: password,
      });
  
      const { token, user } = response.data;

      // Salva o token no localStorage para futuras autenticações
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id); // Salva o ID do usuário, se necessário
      const role = user.papel?.toLowerCase();
  
      console.log("Token recebido:", token);
      console.log("Usuário recebido:", user);
  
      if (!user || !user.papel || !user.id) {
        throw new Error("Dados incompletos recebidos da API.");
      }
  
      const papel = user.papel; // Obtém o papel
      const id = user.id; // Obtém o ID
  
      console.log("Papel do usuário:", papel);
      console.log("ID do usuário:", id);
  
      // Salva o token no localStorage para futuras autenticações
      localStorage.setItem("token", token);
  
      // Normaliza o papel para letras minúsculas
      const normalizedRole = papel.toLowerCase();
  
      console.log("Papel normalizado:", normalizedRole);
  
      // Redireciona com base no papel do usuário
      if (normalizedRole === "cliente") {
        console.log(`Redirecionando para: /dashboard/client/${id}`);
        router.push(`/dashboard/client/${id}`);
      } else if (normalizedRole === "administrador") {
        console.log(`Redirecionando para: /dashboard/admin/${id}`);
        router.push(`/dashboard/admin/${id}`);
      } else if (normalizedRole === "secretaria") {
        console.log(`Redirecionando para: /dashboard/secretary/${id}`);
        router.push(`/dashboard/secretary/${id}`);
      } else {
        console.error("Papel do usuário inválido:", papel);
        setErrorMessage("Função de usuário inválida.");
      }
    } catch (error: any) {
      console.error("Erro ao tentar logar:", error);
  
      const status = error.response?.status;
      console.log("Status do erro:", status);
      console.log("Detalhes do erro:", error.response?.data);
  
      if (status === 401) {
        setErrorMessage("Usuário ou senha inválidos.");
      } else {
        setErrorMessage("Erro ao conectar ao servidor. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fundoLogin.src})` }}
    >
      <div className="bg-gray-900 bg-opacity-80 text-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Entrar</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Insira seu endereço de e-mail e senha para acessar sua conta.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Seu e-mail</label>
            <input
              type="email"
              placeholder="exemplo@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/public/signup"
            className="text-blue-400 text-sm hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
