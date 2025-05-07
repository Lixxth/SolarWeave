'use client';

import React from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import Link from 'next/link'; // Importamos Link para la navegación
import { HomeIcon, BarChart2Icon, UserIcon } from "lucide-react"; // Si usas 'lucide-react' para los iconos
import { GoFileDirectory } from "react-icons/go";

const plomeros = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    direccion: 'Av. Reforma 123, Ciudad de México',
    telefono: '+52 55 1234 5678',
  },
  {
    id: 2,
    nombre: 'María Gómez',
    direccion: 'Calle 5 de Febrero 234, Guadalajara',
    telefono: '+52 33 8765 4321',
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    direccion: 'Av. Insurgentes Sur 456, Ciudad de México',
    telefono: '+52 55 2345 6789',
  },
];

const Directorio = () => {
  return (
    <div className=" bg-white">
      {/* SEO */}
      <NextSeo
        title="Directorio | AquaDetect"
        description="Plataforma de monitoreo de fugas de agua"
        canonical="https://www.AquaDetect.com/"
      />

      {/* Header con logo y nombre */}
      <div className="w-full">
        <header className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/leakT.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold ml-10 sm:text-lg">AquaDetect</h1>
          </div>
        </header>
      </div>

      {/* Título y saludo de la IA */}
      <header className="bg-blue-600 text-white p-4 rounded-md mb-6 mx-4 md:mx-8 mt-3">
        <h1 className="text-3xl font-semibold">¡Bienvenido al Directorio de Plomeros!</h1>
        <p className="mt-2">Soy tu asistente virtual y aquí te ayudaré a encontrar plomeros de confianza.</p>
      </header>
      {/* Sección de plomeros */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Plomeros Disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mb-20 " >
          {plomeros.map((plomero) => (
            <div key={plomero.id} className="bg-white rounded-lg shadow-md p-4 mb-4border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-blue-600">{plomero.nombre}</h3>
              <p className="text-gray-600 mt-2"><strong>Dirección:</strong> {plomero.direccion}</p>
              <p className="text-gray-600 mt-1"><strong>Teléfono:</strong> {plomero.telefono}</p>
            </div>
          ))}
        </div>
      </section>


{/* Barra de navegación inferior */}
<nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 px-2 shadow-lg z-50 sm:flex-col sm:space-y-3 sm:py-4">
        <Link href="/inicio" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </button>
        </Link>
        <Link href="/JuegosyConsejos" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-blue-50 rounded-lg transition-colors">
            <BarChart2Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">Juegos y Consejos</span>
          </button>
        </Link>
        <Link href="/dispositivos" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-blue-50 rounded-lg transition-colors">
            <GoFileDirectory className="w-6 h-6 mb-1" />
            <span className="text-xs">Directorio</span>
          </button>
        </Link>
        <Link href="/perfil" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-blue-50 rounded-lg transition-colors">
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </Link>
      </nav>


    </div>



  );
};

export default Directorio;
