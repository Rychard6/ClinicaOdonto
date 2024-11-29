"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    contato: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ nome: "", email: "", contato: "", assunto: "", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
        <h1 className="text-3xl font-extrabold mb-6 text-purple-600 text-center">
          Entre em Contato
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Seu email"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
          <input
            type="text"
            name="contato"
            value={form.contato}
            onChange={handleChange}
            placeholder="Seu contato"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
          <input
            type="text"
            name="assunto"
            value={form.assunto}
            onChange={handleChange}
            placeholder="Assunto"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
          <textarea
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Sua mensagem"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Enviar
          </button>
        </form>
        {status === "loading" && (
          <p className="text-purple-600 mt-4 text-center animate-pulse">
            Enviando sua mensagem...
          </p>
        )}
        {status === "success" && (
          <p className="text-green-600 mt-4 text-center">
            Mensagem enviada com sucesso!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 text-center">
            Erro ao enviar mensagem.
          </p>
        )}
      </div>
    </div>
  );
}
