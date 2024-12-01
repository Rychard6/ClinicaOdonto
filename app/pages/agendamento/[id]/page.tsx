"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { format, addDays, isToday } from "date-fns";
import axios from "axios";

const AppointmentBooking = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [mountedId, setMountedId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState([
    "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "14:00", "14:30", "15:00", "15:30",
  ]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    crm: "",
    description: "",
    imageUrl: "",
  });
  const [storedDate, setStoredDate] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState("Odontologia");
  const [userInfo, setUserInfo] = useState<any>(null); // Dados do usuário autenticado

  // Garante que o código roda no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Recupera o ID do médico pela URL
  useEffect(() => {
    if (isClient) {
      const id = searchParams.get("id");
      setMountedId(id);
    }
  }, [isClient, searchParams]);

  // Busca as informações do médico e define as datas disponíveis
  useEffect(() => {
    if (!mountedId) return;

    const fetchDoctorInfo = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${mountedId}`);
        const data = await response.json();
        setDoctorInfo({
          name: data.name || "Médico Desconhecido",
          crm: `CRM: ${mountedId} - ${specialty}`,
          description: "Especialista em tratamentos odontológicos.",
          imageUrl: data.image,
        });
      } catch (error) {
        console.error("Erro ao buscar informações do médico:", error);
      }
    };

    fetchDoctorInfo();

    const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));
    setAvailableDates(dates);
  }, [mountedId, specialty]);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      router.push("/public/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error.response?.data || error.message);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/public/login");
    }
  };

    fetchUserInfo();
  }, [router]);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setStoredDate(e.target.value);
  };

  const handleTimeSelection = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecialty(e.target.value);
  };

  const handleAppointmentButtonClick = () => {
    if (selectedTime) {
      setIsModalOpen(true);
    } else {
      alert("Por favor, selecione um horário.");
    }
  };

  const confirmAppointment = () => {
    console.log(`Consulta confirmada para ${storedDate} às ${selectedTime} na especialidade ${specialty}`);
    setIsModalOpen(false);
  };

  const cancelAppointment = () => {
    setIsModalOpen(false);
  };

  if (!isClient) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 md:p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-600">Agendar Consulta</h1>

        {/* Informações do Usuário */}
        {userInfo && (
          <div className="text-right mb-4">
            <p className="text-gray-700 text-sm">Bem-vindo, <strong>{userInfo.nome}</strong></p>
          </div>
        )}

        <div className="flex flex-col items-center">
          {/* Informações do Médico */}
          <div className="flex flex-col items-center w-full text-center mb-6">
            {doctorInfo.imageUrl ? (
              <img
                src={doctorInfo.imageUrl}
                alt={doctorInfo.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 shadow-lg bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Carregando...</span>
              </div>
            )}
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{doctorInfo.name}</h2>
            <p className="text-gray-600">{doctorInfo.crm}</p>
            <p className="text-gray-600 italic mt-2">{doctorInfo.description}</p>
          </div>

          {/* Seleção de Especialidade */}
          <div className="w-full">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Escolha a especialidade</h3>
            <select
              value={specialty}
              onChange={handleSpecialtyChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-green-500"
            >
              <option value="Odontologia">Odontologia</option>
              <option value="Pediatria">Pediatria</option>
              <option value="Cardiologia">Cardiologia</option>
              <option value="Dermatologia">Dermatologia</option>
            </select>
          </div>

          {/* Seleção de Data */}
          <div className="w-full">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Escolha a data e o horário</h3>
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-green-500"
            >
              {availableDates.map((date) => (
                <option key={date.toISOString()} value={format(date, "yyyy-MM-dd")}>
                  {isToday(date) ? "Hoje" : format(date, "dd/MM/yyyy")}
                </option>
              ))}
            </select>

            {/* Seleção de Horários */}
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Horários Disponíveis</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    className={`px-4 py-2 border rounded-md text-gray-700 ${
                      selectedTime === time
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-green-500 hover:text-white"
                    } transition`}
                    onClick={() => handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Agendamento */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAppointmentButtonClick}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            AGENDAR
          </button>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-80 md:w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Confirmar Agendamento</h3>
            <p className="text-gray-700 text-center mb-6">
              Você selecionou a data <strong>{storedDate && format(new Date(storedDate), "dd/MM/yyyy")}</strong> às{" "}
              <strong>{selectedTime}</strong> na especialidade <strong>{specialty}</strong>.
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={confirmAppointment}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Confirmar
              </button>
              <button
                onClick={cancelAppointment}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
