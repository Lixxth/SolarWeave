"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import GamesSection from "./GamesSection";
import { PlusCircleIcon, DropletIcon, HomeIcon, BarChart2Icon, UserIcon } from "lucide-react";
import { GoFileDirectory } from "react-icons/go";

const HomeScreen = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Usuario";
  const [showGames, setShowGames] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselData = [
    {
      title: "Ahorra agua en tu hogar",
      description:
        "Cierra el grifo mientras te cepillas los dientes. Esto puede ahorrar hasta 12 litros de agua por minuto.",
      image: "/imagenesHome/ahorro-agua.jpg",
    },
    {
      title: "Reutiliza el agua de lluvia",
      description:
        "Instalar un sistema de recolección de agua de lluvia puede reducir tu consumo de agua potable y ahorrar en la factura.",
      image: "/imagenesHome/ahorro-agua2.jpg",
    },
    {
      title: "Instala dispositivos ahorradores",
      description:
        "Los dispositivos como duchas de bajo flujo y inodoros eficientes pueden reducir el consumo de agua en tu hogar.",
      image: "/imagenesHome/ahorro-agua3.jpg",
    },
  ];

  // Función para cambiar el índice del carrusel
  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  // Cambiar el carrusel automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with greeting */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/leakT.png" alt="Logo" width={40} height={40} />
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">
          ¡Hola, {userName}!
        </h2>
      </header>

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 text-center">
        <h1 className="text-4xl font-bold text-white">BIENVENIDO</h1>
      </div>

      {/* Free fries card */}
      <div className="mx-4 my-6 p-4 bg-white rounded-lg shadow-lg border-2 border-[#353de0]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Cuidamos del agua y de tu bolsillo
            </h3>
            <p className="text-gray-600">
              Juntos podemos ahorrar agua y reducir costos
            </p>
          </div>
          <span className="text-2xl font-bold text-[#1a3b61]">
            AHORRA CON NOSOTROS
          </span>
        </div>
      </div>

      {/* Games section */}
      <GamesSection />

      {/* Water Saving Carousel */}
      <section className="mx-4 my-6">
        <h2 className="text-xl font-bold mb-4">Ahorra Agua</h2>
        <div className="bg-white rounded-lg shadow-lg p-4 mb-24">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-60 h-60 md:h-80">
              <img
                src={carouselData[carouselIndex].image}
                alt="Ahorro de agua"
                className="object-cover w-full h-full rounded-lg opacity-80"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
                <h3 className="text-xl font-semibold text-white text-center mb-2">
                  {carouselData[carouselIndex].title}
                </h3>
                <p className="text-white text-sm text-center">
                  {carouselData[carouselIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom navigation */}
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
            <GoFileDirectory  className="w-6 h-6 mb-1" />
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

export default HomeScreen;
