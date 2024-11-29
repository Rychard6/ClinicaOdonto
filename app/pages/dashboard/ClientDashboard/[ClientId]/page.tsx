"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Dashboard() {
  const { ClientId } = useParams(); // Obtemos o ID do cliente da rota
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // Função para buscar dados do cliente baseado no ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula uma chamada para buscar dados do cliente
        const response = await fetch(`/api/client/${ClientId}`); // Exemplo de rota para API
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (ClientId) {
      fetchData();
    }
  }, [ClientId]);

  const openEditProfileModal = () => {
    setEditProfileOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileOpen(false);
  };

  const openDetailsModal = (details) => {
    setAppointmentDetails(details);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setAppointmentDetails(null);
  };

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Carregando...</div>;
  }

  if (!userData) {
    return <div className="min-h-screen flex justify-center items-center">Cliente não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Dashboard do Cliente</h1>
          <button
            onClick={openEditProfileModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Editar Perfil
          </button>
        </header>

        {/* Profile Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Informações do Perfil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Nome:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Telefone:</strong> {userData.phone}
            </p>
            <p>
              <strong>Data de Cadastro:</strong> {userData.registrationDate}
            </p>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consultas Agendadas</h2>
          <ul>
            {userData.upcomingAppointments.map((appointment, index) => (
              <li key={index} className="mb-4">
                <p>
                  <strong>Data:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Horário:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Especialidade:</strong> {appointment.specialty}
                </p>
                <button
                  onClick={() => openDetailsModal(appointment)}
                  className="text-blue-500 hover:underline"
                >
                  Ver Detalhes
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Past Appointments */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consultas Anteriores</h2>
          <ul>
            {userData.pastAppointments.map((appointment, index) => (
              <li key={index} className="mb-4">
                <p>
                  <strong>Data:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Especialidade:</strong> {appointment.specialty}
                </p>
                <button
                  onClick={() => openDetailsModal(appointment)}
                  className="text-blue-500 hover:underline"
                >
                  Ver Detalhes
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="Telefone"
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={closeEditProfileModal}
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Detalhes da Consulta</h2>
            <p>
              <strong>Data:</strong> {appointmentDetails?.date}
            </p>
            <p>
              <strong>Horário:</strong> {appointmentDetails?.time}
            </p>
            <p>
              <strong>Especialidade:</strong> {appointmentDetails?.specialty}
            </p>
            <p>
              <strong>Observações:</strong> {appointmentDetails?.notes}
            </p>
            <button
              onClick={closeDetailsModal}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
