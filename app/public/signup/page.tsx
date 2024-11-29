"use client";

import React, { useState } from "react";
import axios from "axios";
import fundoLogin from "../../imagens/fundo.png";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Verifica se o usuário já existe
      const checkResponse = await axios.get(`http://localhost:3001/usuarios?email=${email}`);
      if (checkResponse.data.exists) {
        alert("Usuário já cadastrado com este e-mail.");
        return;
      }

      // Envia a requisição POST para o backend
      const response = await axios.post("http://localhost:3001/usuarios", {
        nome: name,
        email: email,
        senha: password,
      });
      console.log("Usuário cadastrado:", response.data);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fundoLogin.src})` }}
    >
      <div className="bg-gray-900 bg-opacity-85 text-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Cadastrar</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Preencha os campos abaixo para criar sua conta.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Confirme sua senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Cadastrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/public/login" className="text-blue-400 text-sm hover:underline">
            Já tem uma conta? Entrar
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
