import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withPrivateRoute = (Component: React.ComponentType) => {
  return function PrivateRouteWrapper(props: any) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redireciona para a página de login
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Mostra nada enquanto verifica a autenticação
    }

    return <Component {...props} />;
  };
};

export default withPrivateRoute;
