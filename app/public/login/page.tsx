"use client";

import React, { useState } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/router'; // Para redirecionamento
import fundoLogin from '../../imagens/fundo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        email,
        senha: password,
      });

      // Armazena o token no localStorage
      const token = response.data.data.token;
      localStorage.setItem('token', token);

      // Redireciona para o dashboard
      router.push('/dashboard');
    } catch (error) {
      setErrorMessage('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fundoLogin.src})` }}
    >
      <div className="bg-gray-900 bg-opacity-80 text-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Entrar</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Insira seu endereço de e-mail e senha para acessar sua conta.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Seu e-mail</label>
            <input
              type="email"
              placeholder="exemplo@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-blue-400 text-sm hover:underline">Não tem uma conta? Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
