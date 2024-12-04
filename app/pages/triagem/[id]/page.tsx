"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { getTriagemByUsuarioId, createTriagem, updateTriagem, saveTriagem } from "../../../services/triagem";

enum Prioridade {
  BAIXA = "BAIXA",
  MEDIA = "MEDIA",
  ALTA = "ALTA"
}

const ScreeningPage: React.FC = () => {
  const [formData, setFormData] = useState({
    usuarioId: 0,
    descricao: "",
    prioridade: Prioridade.ALTA,
    alergias: "",
    condicoesMedicas: "",
    dor: 0,
    frequenciaHigieneBucal: "",
    fumante: false,
    genero: "",
    idade: 0,
    medicacaoEmUso: "",
    queixa: "",
    ultimaVisita: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [triagemId, setTriagemId] = useState<number | null>(null);

  useEffect(() => {
    const usuarioId = Number(localStorage.getItem('userId'));
    if (usuarioId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        usuarioId: usuarioId,
      }));
    }
  }, []);

  useEffect(() => {
    const fetchTriagem = async () => {
      try {
        if (formData.usuarioId !== 0) {
          const triagens = await getTriagemByUsuarioId(formData.usuarioId);
          if (triagens.length > 0) {
            const ultimaTriagem = triagens[triagens.length - 1];
            console.log("Última triagem encontrada:", ultimaTriagem);
            setFormData((prevFormData) => ({
              ...prevFormData,
              ...ultimaTriagem,
              fumante: ultimaTriagem.fumante || false, // Certifique-se de que o valor de fumante é booleano
            }));
            setTriagemId(ultimaTriagem.id);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar triagem:", error);
      }
    };

    fetchTriagem();
  }, [formData.usuarioId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : (name === "idade" || name === "dor" ? Number(value) : value),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        ultimaVisita: formData.ultimaVisita ? `${formData.ultimaVisita}T00:00:00Z` : "",
      };
      console.log("Dados do formulário antes de salvar:", formattedData);
      const savedTriagem = await saveTriagem(triagemId, formattedData);
      setTriagemId(savedTriagem.id);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar triagem:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Triagem</h1>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
              Descrição
            </label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prioridade">
              Prioridade
            </label>
            <select
              name="prioridade"
              value={formData.prioridade || Prioridade.ALTA}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={Prioridade.ALTA}>Alta</option>
              <option value={Prioridade.MEDIA}>Média</option>
              <option value={Prioridade.BAIXA}>Baixa</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alergias">
              Alergias
            </label>
            <textarea
              name="alergias"
              value={formData.alergias || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condicoesMedicas">
              Condições Médicas
            </label>
            <textarea
              name="condicoesMedicas"
              value={formData.condicoesMedicas || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dor">
              Dor (0-10)
            </label>
            <input
              type="number"
              name="dor"
              value={formData.dor || 0}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequenciaHigieneBucal">
              Frequência de Higiene Bucal
            </label>
            <input
              type="text"
              name="frequenciaHigieneBucal"
              value={formData.frequenciaHigieneBucal || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fumante">
              Fumante
            </label>
            <input
              type="checkbox"
              name="fumante"
              checked={formData.fumante || false}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genero">
              Gênero
            </label>
            <input
              type="text"
              name="genero"
              value={formData.genero || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idade">
              Idade
            </label>
            <input
              type="number"
              name="idade"
              value={formData.idade || 0}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicacaoEmUso">
              Medicação em Uso
            </label>
            <textarea
              name="medicacaoEmUso"
              value={formData.medicacaoEmUso || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="queixa">
              Queixa
            </label>
            <textarea
              name="queixa"
              value={formData.queixa || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ultimaVisita">
              Última Visita
            </label>
            <input
              type="date"
              name="ultimaVisita"
              value={formData.ultimaVisita || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScreeningPage;