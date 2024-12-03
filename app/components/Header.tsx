"use client";

import { useState, useEffect } from "react";
import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Para redirecionamento no Next.js
import { FaGraduationCap } from "react-icons/fa6";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNameInitial, setUserNameInitial] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userName = localStorage.getItem("userName") || "";
    const token = localStorage.getItem("token") || "";

    if (userName && token) {
      setIsLoggedIn(true);
      setUserNameInitial(userName.charAt(0).toUpperCase());
      // Gerar uma cor de fundo aleatória
      const colors = ["bg-teal-500", "bg-teal-600", "bg-teal-700"];
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpa o localStorage
    setIsLoggedIn(false);
    router.push("/public/login"); // Redireciona para a página de login
  };

  const goToProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o token
        const role = localStorage.getItem("userRole")?.toLowerCase() || "";
        let normalizedRole = "";
        if (role === "cliente") {
          normalizedRole = "client";
        } else if (role === "administrador") {
          normalizedRole = "admin";
        } else if (role === "secretaria") {
          normalizedRole = "secretary";
        }
        const userId = localStorage.getItem("userId");
        router.push(`/dashboard/${normalizedRole}/${userId}`); // Redireciona para a página do perfil
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between max-w-screen-xl mx-auto">
      {/* Logo */}
      <div
        className="text-teal-600 font-bold text-xl cursor-pointer"
        onClick={() => router.push("/educação")}
      >
        Uniodonto
      </div>

      {/* Menu Toggle */}
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white cursor-pointer ${bgColor}`}
            onClick={() => setModalOpen(!modalOpen)}
          >
            {userNameInitial}
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 w-64 z-50">
          <ul>
            <li
              className="flex items-center p-2 text-teal-600 hover:bg-teal-100 cursor-pointer rounded-md"
              onClick={goToProfile}
            >
              <FaUser className="mr-2" />
              Perfil
            </li>
            <li
              className="flex items-center p-2 text-teal-600 hover:bg-teal-100 cursor-pointer rounded-md"
              onClick={() => window.location.href = "http://localhost:3000/pages/educacao"}
            >
              <FaGraduationCap className="mr-2" />
              Educação
            </li>
            <li
              className="flex items-center p-2 text-red-500 hover:bg-red-100 cursor-pointer rounded-md"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </li>
          </ul>
        </div>
      )}

    </nav>
  );
}
