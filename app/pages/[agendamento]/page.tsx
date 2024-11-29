"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format, addDays, isToday } from "date-fns";

const AppointmentBooking = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([
    "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "14:00", "14:30", "15:00", "15:30",
  ]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    crm: "",
    description: "",
    imageUrl: "",
  });

  const [storedDate, setStoredDate] = useState(null);

  useEffect(() => {
    if (!id) return; // Aguarda até que o ID esteja disponível

    // Busca informações do médico com base no ID
    const fetchDoctorInfo = async () => {
      try {
        // Simulando uma API fictícia com o ID
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setDoctorInfo({
          name: data.name || "Médico Desconhecido",
          crm: `CRM: ${id} - Odontologia`,
          description: "Especialista em tratamentos odontológicos.",
          imageUrl: data.image,
        });
      } catch (error) {
        console.error("Erro ao buscar informações do médico:", error);
      }
    };

    fetchDoctorInfo();

    // Gerar os próximos 30 dias a partir de hoje
    const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));
    setAvailableDates(dates);
  }, [id]); // Dependência do ID da rota

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setStoredDate(e.target.value);
  };

  const handleTimeSelection = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null);
    } else {
      setSelectedTime(time);
    }
  };

  const handleAppointmentButtonClick = () => {
    if (selectedTime) {
      setIsModalOpen(true);
    } else {
      alert("Por favor, selecione um horário.");
    }
  };

  const confirmAppointment = () => {
    console.log(`Consulta confirmada para ${storedDate} às ${selectedTime}`);
    setIsModalOpen(false);
  };

  const cancelAppointment = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 md:p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-600">Agendar Consulta</h1>

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

          {/* Formulário de Agendamento */}
          <div className="w-full">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Escolha a data e o horário da consulta</h3>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data:</label>
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-green-500"
            >
              {availableDates.map((date) => (
                <option key={date} value={format(date, "yyyy-MM-dd")}>
                  {isToday(date) ? "Hoje" : format(date, "dd/MM/yyyy")}
                </option>
              ))}
            </select>

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

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Local de Atendimento</h3>
          <p className="text-gray-600">Clínica Odonto Brasília - SHIS QI 17, Lago Sul, Brasília - DF</p>
        </div>

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
              Você selecionou a data <strong>{storedDate && format(new Date(storedDate), "dd/MM/yyyy")}</strong> às <strong>{selectedTime}</strong>.
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
