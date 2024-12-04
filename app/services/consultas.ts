import api from "./api";

// Interface para os dados da consulta
interface Consulta {
  id: number;
  data: string;
  status: string;
  usuarioId: number;
  dentistaId: number;
  especialidade: string;
  descricao?: string;
  horario: string;
  usuario: {
    nome: string;
    email: string;
    telefone: string;
  };
}

// Função para buscar consultas por data
export const getConsultasByDate = async (date: string): Promise<Consulta[]> => {
  try {
    const response = await api.get("/consultas", {
      params: { date },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar consultas:", error.message);
    throw new Error("Não foi possível carregar as consultas.");
  }
};

// Função para atualizar o status de uma consulta
export const updateConsultaStatus = async (consultaId: number, status: string): Promise<Consulta> => {
  try {
    const response = await api.patch(`/consultas/${consultaId}/status`, { status });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar o status da consulta:", error.message);
    throw new Error("Não foi possível atualizar o status da consulta.");
  }
};