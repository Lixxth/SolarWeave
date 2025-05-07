'use client';

import React from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { HomeIcon, BarChart2Icon, UserIcon, StarIcon } from "lucide-react";
import { GoFileDirectory } from "react-icons/go";

const instaladores = [
  {
    id: 1,
    nombre: 'Carlos Solar',
    especialidad: 'Instalación de Mallas Solares',
    experiencia: '5 años',
    certificaciones: ['Certificación SolarWeave', 'Energía Renovable Avanzada'],
    calificacion: 4.9,
    proyectos: 120,
    imagen: '/instaladores/instalador1.jpg'
  },
  {
    id: 2,
    nombre: 'Ana Energía',
    especialidad: 'Optimización de Sistemas Solares',
    experiencia: '7 años',
    certificaciones: ['Certificación SolarWeave', 'Diseño Solar Residencial'],
    calificacion: 4.8,
    proyectos: 95,
    imagen: '/instaladores/instalador2.jpg'
  },
  {
    id: 3,
    nombre: 'Miguel Verde',
    especialidad: 'Mantenimiento de Mallas Solares',
    experiencia: '4 años',
    certificaciones: ['Certificación SolarWeave', 'Eficiencia Energética'],
    calificacion: 4.7,
    proyectos: 78,
    imagen: '/instaladores/instalador3.jpg'
  },
];

const Directorio = () => {
  return (
    <div className="bg-gradient-to-b from-white via-yellow-200 to-red-300 min-h-screen">
      {/* SEO */}
      <NextSeo
        title="Instaladores Certificados | SolarWeave"
        description="Encuentra instaladores certificados para tu sistema de mallas solares"
        canonical="https://www.SolarWeave.com/"
      />

      {/* Header con logo y nombre */}
      <div className="w-full">
        <header className="bg-gradient-to-r from-red-600 to-yellow-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/solarweave-logo.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold ml-10 sm:text-lg">SolarWeave</h1>
          </div>
        </header>
      </div>

      {/* Título y saludo */}
      <header className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-6 rounded-lg mb-6 mx-4 md:mx-8 mt-3">
        <h1 className="text-3xl font-semibold">Instaladores Certificados SolarWeave</h1>
        <p className="mt-2">Encuentra profesionales certificados para la instalación de tus mallas solares</p>
      </header>

      {/* Sección de instaladores */}
      <section className="px-4 md:px-8">
        <h2 className="text-2xl font-semibold mb-4 text-red-700">Profesionales Certificados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {instaladores.map((instalador) => (
            <div key={instalador.id} className="bg-white rounded-lg shadow-lg p-6 border border-red-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={instalador.imagen}
                    alt={instalador.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600">{instalador.nombre}</h3>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-600">{instalador.calificacion}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-700"><strong>Especialidad:</strong> {instalador.especialidad}</p>
                <p className="text-gray-700"><strong>Experiencia:</strong> {instalador.experiencia}</p>
                <p className="text-gray-700"><strong>Proyectos:</strong> {instalador.proyectos} completados</p>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-red-600 mb-1">Certificaciones:</p>
                  <div className="flex flex-wrap gap-2">
                    {instalador.certificaciones.map((cert, index) => (
                      <span key={index} className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-2 rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all transform hover:scale-105">
                Contactar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 px-2 shadow-lg z-50 sm:flex-col sm:space-y-3 sm:py-4">
        <Link href="/inicio" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </button>
        </Link>
        <Link href="/JuegosyConsejos" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-red-50 rounded-lg transition-colors">
            <BarChart2Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">Juegos y Consejos</span>
          </button>
        </Link>
        <Link href="/dispositivos" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-red-50 rounded-lg transition-colors">
            <GoFileDirectory className="w-6 h-6 mb-1" />
            <span className="text-xs">Instaladores</span>
          </button>
        </Link>
        <Link href="/perfil" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-red-50 rounded-lg transition-colors">
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Directorio;
