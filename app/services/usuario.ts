import api from './api';

export const getUsuarios = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

export const createUsuario = async (usuario: any) => {
  const response = await api.post('/usuarios', usuario);
  return response.data;
};
