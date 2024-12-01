import api from "./api";

// Interface para os dados do usuário
interface Usuario {
  id: string;
  name: string;
  email: string;
  senha?: string; // Pode ser omitida dependendo do contexto
}

// Adicionar o tipo de retorno das funções
export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const createUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const response = await api.post("/usuarios", usuario);
  return response.data;
};

export const loginUsuario = async (
  email: string,
  senha: string
): Promise<{ token: string; usuario: Usuario }> => {
  const response = await api.post("/usuarios/login", { email, senha });
  return response.data;
};
