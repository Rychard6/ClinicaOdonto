"use client";
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SecretariasPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [email, setEmail] = useState("");
  const [dentistas, setDentistas] = useState([]);

  useEffect(() => {
    // Função para buscar os dados dos dentistas
    const fetchDentistas = async () => {
      try {
        const response = await fetch("http://localhost:3001/dentistas");
        const data = await response.json();
        setDentistas(data);
      } catch (error) {
        console.error("Erro ao buscar dentistas:", error);
      }
    };

    fetchDentistas();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const assignPermissions = async (userId: number) => {
    try {
      await fetch(`http://localhost:3001/usuarios/${userId}/papel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ papel: "SECRETARIA" }),
      });
      alert(`Permissões atribuídas ao usuário com ID: ${userId}`);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao atribuir permissões:", error);
    }
  };

  // Dados para o gráfico
  const chartData = {
    labels: dentistas.map((dentista) => dentista.nome),
    datasets: [
      {
        label: "Consultas Confirmadas",
        data: dentistas.map((dentista) => dentista.consultas.length),
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
        borderRadius: 5,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Remove a legenda para manter o design limpo
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.raw} consultas confirmadas`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove linhas de grade do eixo X
        },
        ticks: {
          color: "#374151", // Cinza escuro
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#E5E7EB", // Linhas de grade suaves
        },
        ticks: {
          color: "#374151",
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
      },
    },
  };

  // Estatísticas
  const totalConsultas = chartData.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0
  );
  const topPerformers = dentistas
    .map((dentista) => ({
      nome: dentista.nome,
      consultas: dentista.consultas.length,
    }))
    .sort((a, b) => b.consultas - a.consultas);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Secretarias</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Adicionar Nova Secretaria
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            Gerencie as secretarias e atribua permissões para os usuários.
          </p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Pesquisar Usuário
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Digite o e-mail do usuário"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Pesquisar
              </button>
              {searchResults.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Resultados:
                  </h3>
                  <ul>
                    {searchResults.map((user) => (
                      <li
                        key={user.id}
                        className="flex justify-between items-center p-2 border-b"
                      >
                        <span>
                          <strong>{user.name}</strong> <br />
                          <span className="text-sm text-gray-500">
                            {user.email}
                          </span>
                        </span>
                        <button
                          onClick={() => assignPermissions(user.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Atribuir Permissões
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gráficos e Estatísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Consultas Confirmadas por Dentista
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Estatísticas */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Estatísticas Gerais
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Total de Consultas Confirmadas:</strong> {totalConsultas}
            </p>
            <h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">
              Top Dentistas
            </h3>
            <ul>
              {topPerformers.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span className="text-gray-700">{item.nome}</span>
                  <span className="text-gray-500">{item.consultas} consultas</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}