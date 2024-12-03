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

    try {
      // Faz a chamada para a API de login
      const response = await axios.post("http://localhost:3001/usuarios/login", {
        email,
        senha: password,
      });

      const { token, user } = response.data;

      if (!user || !user.papel || !user.id) {
        throw new Error("Dados incompletos recebidos da API.");
      }

      // Salva o token e o ID no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.papel);
      localStorage.setItem("userName", user.nome);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userPhone", user.telefone);
      localStorage.setItem("userRegistrationDate", user.criadoEm);
      localStorage.setItem("userAppointments", JSON.stringify(user.consultas));
      localStorage.setItem("userSpecialties", JSON.stringify(user.especialidades));

      // Normaliza o papel e redireciona
      const role = user.papel.toLowerCase();
      const userId = user.id;

      const routes = {
        cliente: `/dashboard/client/${userId}`,
        administrador: `/dashboard/admin/${userId}`,
        secretaria: `/dashboard/secretary/${userId}`,
      };

      if (routes[role]) {
        router.push(routes[role]);
      } else {
        setErrorMessage("Função de usuário inválida.");
      }
    } catch (error: any) {
      const status = error.response?.status;

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
