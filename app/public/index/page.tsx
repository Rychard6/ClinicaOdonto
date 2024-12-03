"use client";

import React, { useEffect, useState } from "react";
import { FaTooth, FaSmile, FaHeartbeat, FaBars, FaTimes, FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const [professionals, setProfessionals] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character")
      .then(response => {
        const characters = response.data.results.slice(0, 3).map(character => ({
          name: character.name,
          specialty: "Rick and Morty Character",
          image: character.image,
        }));
        setProfessionals(characters);
      })
      .catch(error => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLoginClick = () => {
    router.push('/public/login');
  };

  const handleMenuClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white text-gray-800 p-4 shadow-md fixed w-full z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">UniOdonto</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#mission" onClick={() => handleMenuClick('mission')} className="hover:text-teal-600 transition duration-300">Missão</a>
            <a href="#vision" onClick={() => handleMenuClick('vision')} className="hover:text-teal-600 transition duration-300">Visão</a>
            <a href="#values" onClick={() => handleMenuClick('values')} className="hover:text-teal-600 transition duration-300">Valores</a>
            <a href="#services" onClick={() => handleMenuClick('services')} className="hover:text-teal-600 transition duration-300">Especialidades</a>
            <a href="#professionals" onClick={() => handleMenuClick('professionals')} className="hover:text-teal-600 transition duration-300">Profissionais</a>
            <a href="#contact" onClick={() => handleMenuClick('contact')} className="hover:text-teal-600 transition duration-300">Contato</a>
          </nav>
          <div className="hidden md:flex space-x-4">
            <button onClick={handleLoginClick} className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
              Login
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="absolute top-0 left-0 w-full bg-white text-gray-800 p-4 z-10 shadow-lg">
            <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
              <FaTimes className="text-2xl" />
            </button>
            <a href="#mission" onClick={() => handleMenuClick('mission')} className="block py-2">Missão</a>
            <a href="#vision" onClick={() => handleMenuClick('vision')} className="block py-2">Visão</a>
            <a href="#values" onClick={() => handleMenuClick('values')} className="block py-2">Valores</a>
            <a href="#services" onClick={() => handleMenuClick('services')} className="block py-2">Especialidades</a>
            <a href="#professionals" onClick={() => handleMenuClick('professionals')} className="block py-2">Profissionais</a>
            <a href="#contact" onClick={() => handleMenuClick('contact')} className="block py-2">Contato</a>
            <button onClick={handleLoginClick} className="block w-full text-left py-2 mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
              Login
            </button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800 opacity-75"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-8 md:p-20">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo à UniOdonto</h1>
            <p className="text-xl md:text-2xl mb-6">
              Cuidados odontológicos de alta qualidade para toda a família.
            </p>
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section id="mission" className="p-8 md:p-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaBullseye className="text-teal-600 text-6xl mb-4 mx-auto" />
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">Nossa Missão</h2>
              <p className="mb-8 text-gray-700 text-lg md:text-xl">Proporcionar cuidados odontológicos de excelência, promovendo a saúde bucal e o bem-estar de nossos pacientes com um atendimento humanizado e tecnologias de ponta.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaEye className="text-teal-600 text-6xl mb-4 mx-auto" />
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">Nossa Visão</h2>
              <p className="mb-8 text-gray-700 text-lg md:text-xl">Ser reconhecida como a melhor clínica odontológica da região, oferecendo um atendimento de qualidade e inovador que supere as expectativas dos nossos pacientes.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaHandsHelping className="text-teal-600 text-6xl mb-4 mx-auto" />
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">Nossos Valores</h2>
              <p className="mb-8 text-gray-700 text-lg md:text-xl">Ética, Comprometimento, Inovação, Respeito e Excelência são os pilares que sustentam nosso trabalho diário e nossa relação com os pacientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços e Especialidades */}
      <section id="services" className="p-8 md:p-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Nossos Serviços</h2>
          <p className="mb-8 text-gray-700 text-lg md:text-xl">Conheça as especialidades que oferecemos para o cuidado completo de sua saúde bucal.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Serviço 1 */}
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaTooth className="text-teal-600 text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Ortodontia</h3>
              <p className="text-gray-600 text-lg">Tratamentos para alinhar e corrigir a posição dos dentes, proporcionando um sorriso mais harmonioso e saudável.</p>
            </div>
            {/* Serviço 2 */}
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaSmile className="text-teal-600 text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Periodontia</h3>
              <p className="text-gray-600 text-lg">Cuidados e tratamento das gengivas e tecidos de suporte dos dentes, prevenindo e tratando doenças periodontais.</p>
            </div>
            {/* Serviço 3 */}
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaHeartbeat className="text-teal-600 text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Endodontia</h3>
              <p className="text-gray-600 text-lg">Tratamento de canais radiculares e doenças da polpa dentária, aliviando a dor e preservando a saúde dos dentes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Profissionais */}
      <section id="professionals" className="p-8 md:p-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Nossos Profissionais</h2>
          <Slider {...settings}>
            {professionals.map((professional, index) => (
              <div key={index} className="p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105">
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img src={professional.image} alt={professional.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{professional.name}</h3>
                  <p className="text-gray-600 text-lg">{professional.specialty}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Contato */}
      <section id="contact" className="p-8 md:p-20 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Entre em Contato</h2>
          <p className="mb-8 text-lg md:text-xl">Estamos aqui para ajudar. Entre em contato conosco para agendar uma consulta ou tirar suas dúvidas.</p>
          <form className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <input type="text" placeholder="Nome" className="w-full p-3 rounded-lg text-gray-800 border border-gray-300" />
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Email" className="w-full p-3 rounded-lg text-gray-800 border border-gray-300" />
            </div>
            <div className="mb-4">
              <textarea placeholder="Mensagem" className="w-full p-3 rounded-lg text-gray-800 border border-gray-300"></textarea>
            </div>
            <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 text-white p-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">&copy; 2023 UniOdonto. Todos os direitos reservados.</p>
          <p className="text-lg">Desenvolvido por Ruan Sander</p>

        </div>
      </footer>
    </div>
  );
}