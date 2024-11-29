import React from "react";
import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação
import { useRouter } from "next/router";

const withPublicRoute = <P extends object>(Component: React.ComponentType<P>) => {
  const PublicRoute = (props: P) => {
    const { user } = useAuth(); // Verifica se o usuário está autenticado
    const router = useRouter();

    // Se o usuário estiver logado, redireciona para o dashboard
    if (user) {
      router.replace("/dashboard");
      return null;
    }

    return <Component {...props} />;
  };

  return PublicRoute;
};

export default withPublicRoute;
