"use client";

interface Appointment {
  date: string;
  time: string;
  specialty: string;
  notes?: string;
}

interface ClientData {
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
}

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Dashboard() {
  const params = useParams(); // Captura os parâmetros dinâmicos
  console.log("Parâmetros capturados:", params);

  const ClientId = params?.id; // Certifique-se de que está acessando 'id', conforme o nome da pasta dinâmica
  const router = useRouter();
  
  if (!ClientId) {
    console.error("ClientId não foi capturado!");
    return <div className="min-h-screen flex justify-center items-center">Erro: Cliente não encontrado.</div>;
  }

  const [userData, setUserData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment | null>(null);

 
  // Função para buscar dados do cliente baseado no ID
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Você precisa estar logado.");
        router.push("/login");
        return;
      }
      
      try {

        const response = await fetch(`http://localhost:3001/usuarios/${ClientId}`, {
          method: 'GET',
          credentials: 'include', // Inclui cookies na requisição
        });      

        if (!response.ok) {
          console.error(`Erro na API: ${response.status} - ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        // Validação básica do formato de dados
        if (
          data &&
          typeof data.name === "string" &&
          Array.isArray(data.upcomingAppointments) &&
          Array.isArray(data.pastAppointments)
        ) {
          console.log("Dados válidos recebidos:", data);
          setUserData(data);
        } else {
          console.error("Formato inesperado dos dados do cliente:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error.message);
      } finally {
        setIsLoading(false);
        console.log("Finalizado carregamento dos dados.");
      }
    };

    fetchData();
  }, [ClientId]);

  const openEditProfileModal = () => {
    setEditProfileOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileOpen(false);
  };

  const openDetailsModal = (details: Appointment) => {
    console.log("Abrindo modal com detalhes da consulta:", details);
    setAppointmentDetails(details);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    console.log("Fechando modal de detalhes.");
    setDetailsModalOpen(false);
    setAppointmentDetails(null);
  };

  // Caso ainda esteja carregando
  if (isLoading) {
    console.log("Tela de carregamento exibida.");
    return <div className="min-h-screen flex justify-center items-center">Carregando...</div>;
  }

  // Caso nenhum dado do cliente seja encontrado
  if (!userData) {
    console.error("Nenhum dado de cliente encontrado!");
    return <div className="min-h-screen flex justify-center items-center">Cliente não encontrado.</div>;
  }

  console.log("Dados do cliente renderizados:", userData);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Dashboard do Cliente</h1>
          <button
             onClick={() => {
              if (ClientId) {
                router.push(`/pages/agendamento/${ClientId}`);
              } else {
                console.error("ID do cliente não encontrado.");
              }
            }}
            
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
            >
              Agendar
            </button>
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
              <strong>Nome:</strong> {userData.name || "Nome indisponível"}
            </p>
            <p>
              <strong>Email:</strong> {userData.email || "Email indisponível"}
            </p>
            <p>
              <strong>Telefone:</strong> {userData.phone || "Telefone indisponível"}
            </p>
            <p>
              <strong>Data de Cadastro:</strong> {userData.registrationDate || "Data indisponível"}
            </p>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consultas Agendadas</h2>
          <ul>
            {userData.upcomingAppointments && userData.upcomingAppointments.length > 0 ? (
              userData.upcomingAppointments.map((appointment, index) => (
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
              ))
            ) : (
              <p>Nenhuma consulta agendada.</p>
            )}
          </ul>
        </section>

        {/* Past Appointments */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consultas Anteriores</h2>
          <ul>
            {userData.pastAppointments && userData.pastAppointments.length > 0 ? (
              userData.pastAppointments.map((appointment, index) => (
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
              ))
            ) : (
              <p>Nenhuma consulta anterior encontrada.</p>
            )}
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
              <strong>Data:</strong> {appointmentDetails?.date || "Data indisponível"}
            </p>
            <p>
              <strong>Horário:</strong> {appointmentDetails?.time || "Horário indisponível"}
            </p>
            <p>
              <strong>Especialidade:</strong> {appointmentDetails?.specialty || "Especialidade indisponível"}
            </p>
            <p>
              <strong>Observações:</strong> {appointmentDetails?.notes || "Sem observações"}
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