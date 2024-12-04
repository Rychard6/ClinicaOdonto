import api from "./api";

// Interface para os dados da triagem
interface Triagem {
  id: number;
  usuarioId: number;
  descricao: string;
  prioridade: string;
  alergias: string;
  condicoesMedicas: string;
  dor: number;
  frequenciaHigieneBucal: string;
  fumante: boolean;
  genero: string;
  idade: number;
  medicacaoEmUso: string;
  queixa: string;
  ultimaVisita?: Date;
}

// Função para buscar a triagem por usuário ID
export const getTriagemByUsuarioId = async (usuarioId: number): Promise<Triagem> => {
  try {
    console.log("achei", usuarioId);
    const response = await api.get(`/triagem/usuario/${usuarioId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar triagem:", error.message);
    throw new Error("Não foi possível carregar a triagem.");
  }
};

// Função para criar uma nova triagem
export const createTriagem = async (triagem: Triagem): Promise<Triagem> => {
  try {
    const response = await api.post("/triagem", triagem);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar triagem:", error.message);
    throw new Error("Não foi possível criar a triagem.");
  }
};

// Função para atualizar uma triagem existente
export const updateTriagem = async (triagemId: number, triagem: Triagem): Promise<Triagem> => {
  try {
    const response = await api.put(`/triagem/${triagemId}`, triagem);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar triagem:", error.message);
    throw new Error("Não foi possível atualizar a triagem.");
  }
};