"use client";
import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Header from "../../../components/Header";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, UserIcon } from "@heroicons/react/solid";
import { getConsultasByDate, updateConsultaStatus } from "../../../services/consultas";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SecretariaDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [cancelDescription, setCancelDescription] = useState("");
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    // Função para buscar os dados das consultas
    const fetchConsultations = async () => {
      try {
        const data = await getConsultasByDate(selectedDate);
        setConsultations(data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };

    fetchConsultations();
  }, [selectedDate]);

  const updateConsultations = async (id, newStatus, description = "") => {
    try {
      const updatedConsulta = await updateConsultaStatus(id, newStatus);
      setConsultations(
        consultations.map((item) =>
          item.id === id ? { ...item, status: newStatus, descricao: description } : item
        )
      );
      setSelectedConsultation(null);
      setCancelDescription("");
    } catch (error) {
      console.error("Erro ao atualizar o status da consulta:", error);
    }
  };

  const statusColors = {
    PENDENTE: "bg-orange-100 border-orange-500 text-orange-700",
    CONFIRMADA: "bg-green-100 border-green-500 text-green-700",
    CANCELADA: "bg-red-100 border-red-500 text-red-700",
  };

  // Dados para Gráficos Dinâmicos
  const confirmedCount = consultations.filter((c) => c.status === "CONFIRMADA").length;
  const pendingCount = consultations.filter((c) => c.status === "PENDENTE").length;
  const canceledCount = consultations.filter((c) => c.status === "CANCELADA").length;

  const consultationStats = {
    labels: ["Confirmadas", "Canceladas", "Pendentes"],
    datasets: [
      {
        data: [confirmedCount, canceledCount, pendingCount],
        backgroundColor: ["#86efac", "#fca5a5", "#fde68a"],
        hoverBackgroundColor: ["#4ade80", "#f87171", "#facc15"],
      },
    ],
  };

  const specialties = ["Periodontia", "Implantodontia", "Endodontia", "Odontopediatria"];
  const specialtyCounts = specialties.reduce((acc, specialty) => {
    acc[specialty] = consultations.filter((c) => c.especialidade === specialty).length;
    return acc;
  }, {});

  const specialtyData = {
    labels: Object.keys(specialtyCounts),
    datasets: [
      {
        data: Object.values(specialtyCounts),
        backgroundColor: ["#bfdbfe", "#bbf7d0", "#fde68a", "#fecaca"],
        hoverBackgroundColor: ["#60a5fa", "#34d399", "#fbbf24", "#f87171"],
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Título e Filtro */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Dashboard da Secretaria</h1>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lista de Consultas */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Consultas do Dia</h2>
          <ul className="space-y-2">
            {consultations.map((consultation) => (
              <li
                key={consultation.id}
                className={`p-3 flex justify-between items-center rounded border ${statusColors[consultation.status]}`}
              >
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="font-medium">{consultation.usuario.nome}</p>
                    <p className="text-sm text-gray-500">{consultation.especialidade}</p>
                    <p className="text-sm">
                      {consultation.status === "PENDENTE" && (
                        <>
                          <ExclamationCircleIcon className="w-5 h-5 text-orange-500 inline" />{" "}
                          Pendente
                        </>
                      )}
                      {consultation.status === "CONFIRMADA" && (
                        <>
                          <CheckCircleIcon className="w-5 h-5 text-green-500 inline" />{" "}
                          Confirmada
                        </>
                      )}
                      {consultation.status === "CANCELADA" && (
                        <>
                          <XCircleIcon className="w-5 h-5 text-red-500 inline" /> Cancelada
                        </>
                      )}
                    </p>
                    {consultation.descricao && (
                      <p className="text-xs text-gray-600 mt-1">Motivo: {consultation.descricao}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConsultation(consultation)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                >
                  Gerenciar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal de Detalhes */}
        {selectedConsultation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm relative">
              <button
                onClick={() => setSelectedConsultation(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Detalhes da Consulta
              </h2>
              <p>
                <strong>Nome:</strong> {selectedConsultation.usuario.nome}
              </p>
              <p>
                <strong>Email:</strong> {selectedConsultation.usuario.email}
              </p>
              <p>
                <strong>Telefone:</strong> {selectedConsultation.usuario.telefone}
              </p>
              <p>
                <strong>Especialidade:</strong> {selectedConsultation.especialidade}
              </p>
              {selectedConsultation.status === "PENDENTE" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo do Cancelamento (se aplicável):
                  </label>
                  <textarea
                    rows="3"
                    value={cancelDescription}
                    onChange={(e) => setCancelDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    updateConsultations(
                      selectedConsultation.id,
                      "CONFIRMADA",
                      cancelDescription
                    )
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Confirmar
                </button>
                <button
                  onClick={() =>
                    updateConsultations(
                      selectedConsultation.id,
                      "CANCELADA",
                      cancelDescription
                    )
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gráfico de Consultas */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-md font-medium text-gray-700 mb-2">
              Consultas por Status
            </h2>
            <div className="h-40">
              {consultations.length > 0 ? (
                <Pie data={consultationStats} options={{ maintainAspectRatio: false }} />
              ) : (
                <p className="text-center text-gray-500">Nenhuma consulta encontrada</p>
              )}
            </div>
          </div>

          {/* Gráfico de Especialidades */}
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-md font-medium text-gray-700 mb-2">
              Distribuição por Especialidade
            </h2>
            <div className="h-40">
              {consultations.length > 0 ? (
                <Bar data={specialtyData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
                <p className="text-center text-gray-500">Nenhuma consulta encontrada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}