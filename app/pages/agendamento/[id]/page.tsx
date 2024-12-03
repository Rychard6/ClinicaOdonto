"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { format, addDays, isToday } from "date-fns";
import axios from "axios";
import Header from "../../../components/Header";
import { getHorariosIndisponiveis, agendarConsulta } from "../../../services/usuario";

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
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]); // Lista de horários indisponíveis
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    crm: "",
    description: "",
    imageUrl: "",
  });
  const [storedDate, setStoredDate] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState("Periodontia");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [dentistId, setDentistId] = useState<number | null>(null); // Novo estado para o dentista
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");
  
    if (userId) {
      setUserInfo({
        id: parseInt(userId, 10), // Converta o ID para número
        name: userName || "",
        email: userEmail || "",
        role: userRole || "CLIENTE",
      });
    } else {
      console.error("Erro: Dados do usuário não encontrados no localStorage.");
    }
  }, []);
  
  
  // Garante que o código roda no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));
    setAvailableDates(dates);
  }, []);

  // Recupera horários indisponíveis para a data selecionada
  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      if (!selectedDate || !dentistId) return;
  
      try {
        const response = await getHorariosIndisponiveis(selectedDate, dentistId);
        setUnavailableTimes(response || []);
      } catch (error) {
        console.error("Erro ao buscar horários indisponíveis:", error);
      }
    };
  
    fetchUnavailableTimes();
  }, [selectedDate, dentistId]);
  


  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setStoredDate(e.target.value);
  };

  const handleTimeSelection = (time: string) => {
    if (unavailableTimes.includes(time)) return; // Ignorar horários indisponíveis
    setSelectedTime(time === selectedTime ? null : time);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecialty = e.target.value;
    setSpecialty(selectedSpecialty);
  
    // Mapear especialidade para o ID do dentista
    const specialtyToDentistIdMap: Record<string, number> = {
      Periodontia: 1,
      Implantodontia: 2,
      Endodontia: 3,
      Odontopediatria: 4,
    };
  
    setDentistId(specialtyToDentistIdMap[selectedSpecialty]);
  };
  

  const handleAppointmentButtonClick = () => {
    if (!selectedTime || !selectedDate) {
      alert("Por favor, selecione uma data e um horário.");
      return;
    }
    setIsModalOpen(true);
  };


  const confirmAppointment = async () => {
    if (!userInfo || !dentistId) {
      console.error("Dados do usuário ou dentista estão incompletos.");
      console.log("Dados do usuário:", userInfo);
      console.log("ID do dentista:", dentistId);
      alert("Erro: Dados do usuário ou do dentista estão incompletos.");
      return;
    }
  
    try {
      const agendamento = {
        usuarioId: userInfo.id,
        especialidade: specialty,
        data: selectedDate,
        dentistaId: dentistId,
        descricao: "Consulta de rotina", // Pode ser personalizado
        status: "PENDENTE",
        horario: selectedTime,
      };
  
      console.log("Enviando agendamento:", agendamento);
  
      await agendarConsulta(agendamento);
      alert("Consulta agendada com sucesso!");
      setIsModalOpen(false);
      setUnavailableTimes((prev) => [...prev, selectedTime]);
    } catch (error: any) {
      console.error("Erro ao agendar consulta:", error.message || error);
      alert(error.response?.data?.message || "Erro ao agendar consulta.");
    }
  };
  

  const cancelAppointment = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 md:p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-600">Agendar Consulta</h1>

          {userInfo && (
            <div className="w-full mb-6 bg-green-100 p-4 rounded-md shadow-sm text-center">
              <p className="text-lg text-green-700">
                Bem-vindo, <strong>{localStorage.getItem("userName") || "Visitante"}!</strong>
              </p>
              <p className="text-gray-600 text-sm">Pronto para agendar sua consulta?</p>
            </div>
          )}

          <div className="flex flex-col items-center">
            {/* Seleção de Especialidade */}
            <div className="w-full">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Escolha a especialidade</h3>
              <select
                value={specialty}
                onChange={handleSpecialtyChange}
                className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-green-500"
              >
                <option value="Periodontia">Periodontia</option>
                <option value="Implantodontia">Implantodontia</option>
                <option value="Endodontia">Endodontia</option>
                <option value="Odontopediatria">Odontopediatria</option>
              </select>
            </div>

            {/* Seleção de Data */}
            <div className="relative">
              <select
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white appearance-none"
              >
                <option disabled value="">
                  Selecione uma data
                </option>
                {availableDates.map((date) => (
                  <option key={date.toISOString()} value={format(date, "yyyy-MM-dd")}>
                    {isToday(date) ? "Hoje" : format(date, "dd/MM/yyyy")}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-3 text-gray-400">📅</span>
            </div>

            {/* Seleção de Horários */}
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Horários Disponíveis</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`px-4 py-2 border rounded-md text-gray-700 ${
                    unavailableTimes.includes(time)
                      ? "bg-red-300 text-gray-500 cursor-not-allowed"
                      : selectedTime === time
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-green-500 hover:text-white"
                  }`}
                  onClick={() => handleTimeSelection(time)}
                  disabled={unavailableTimes.includes(time)}
                >
                  {time}
                </button>
              ))}


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
                Você selecionou a data <strong>{storedDate && format(new Date(`${storedDate}T00:00:00`), "dd/MM/yyyy")}</strong> às{" "}
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
    </>
  );
};

export default AppointmentBooking;
