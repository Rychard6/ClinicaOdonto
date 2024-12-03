import api from "./api";

// Interface para os dados do usuário
interface Usuario {
  id: string;
  name: string;
  email: string;
  senha?: string; // Senha é opcional no caso de não ser retornada pela API
}

// Interface para os dados do agendamento de consultas
interface Agendamento {
  usuarioId: number;      // ID do usuário autenticado
  especialidade: string;  // Especialidade da consulta
  data: string;           // Data no formato ISO 8601 (YYYY-MM-DD)
  dentistaId: number;     // ID do dentista
  descricao?: string;     // Descrição opcional
}
// Interface para a resposta de horários indisponíveis
interface HorariosIndisponiveisResponse {
  unavailableTimes: string[]; // Lista de horários ocupados (HH:mm)
}

interface Dentista {
  id: number;
  nome: string;
  especializacao: string;
  telefone: string;
  email: string;
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
  dentistaId: number
): Promise<string[]> => {
  try {
    const response = await api.get("/agendamento/horarios-indisponiveis", {
      params: { date, dentistaId },
    });
    return response.data; // O backend já retorna um array de horários ocupados
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
    const response = await api.post("/agendamento", agendamento, {
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

// Função para atualizar informações do usuário (nome e telefone)
export const updateUsuario = async (
  usuarioId: string,
  updates: { name: string; telefone: string }
): Promise<Usuario> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado. Faça login novamente.");
  }

  try {
    const response = await api.put<Usuario>(`/usuarios/${usuarioId}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar informações do usuário:", error.message);
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar as informações do usuário."
    );
  }

};

// Função para buscar todos os dentistas
export const getDentistas = async (): Promise<Dentista[]> => {
  try {
    const response = await api.get("/dentistas");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar dentistas:", error.message);
    throw new Error("Não foi possível carregar os dentistas.");
  }
};