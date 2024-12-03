import api from "./api";

// Interface para os dados do usuário
interface Usuario {
  id: string;
  name: string;
  email: string;
  senha?: string;
}

// Interface para o agendamento de consultas
interface Agendamento {
  date: string;      // Data da consulta (YYYY-MM-DD)
  time: string;      // Hora da consulta (HH:mm)
  specialty: string; // Especialidade selecionada
}

interface HorariosIndisponiveisResponse {
  unavailableTimes: string[];
}

// Função para buscar todos os usuários
export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const response = await api.get("/usuarios");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error.message);
    throw new Error("Não foi possível carregar os usuários.");
  }
};

// Função para criar um novo usuário
export const createUsuario = async (usuario: Usuario): Promise<Usuario> => {
  try {
    const response = await api.post("/usuarios", usuario);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.message);
    throw new Error("Não foi possível criar o usuário.");
  }
};

// Função para fazer login
export const loginUsuario = async (
  email: string,
  senha: string
): Promise<{ token: string; usuario: Usuario }> => {
  try {
    const response = await api.post("/usuarios/login", { email, senha });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.message);
    throw new Error(
      error.response?.data?.message || "E-mail ou senha inválidos."
    );
  }
};

// Função para buscar horários indisponíveis
export const getHorariosIndisponiveis = async (
  date: string,
  specialty: string
): Promise<HorariosIndisponiveisResponse> => {
  try {
    const response = await api.get("/usuarios/horarios-indisponiveis", {
      params: { date, specialty },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar horários indisponíveis:", error.message);
    throw new Error("Não foi possível carregar os horários indisponíveis.");
  }
};

// Função para agendar uma consulta
export const agendarConsulta = async (agendamento: Agendamento): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado. Faça login novamente.");
  }

  try {
    const response = await api.post("/usuarios/agendar", agendamento, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao agendar consulta:", error.message);
    throw new Error(
      error.response?.data?.message || "Erro ao agendar a consulta."
    );
  }
};
