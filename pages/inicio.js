import Image from "next/image";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";
import { PlusCircleIcon, SunIcon, HomeIcon, BarChart2Icon, UserIcon } from "lucide-react";
import { useState } from "react";
import Progress from './Progress';
import Link from 'next/link';
import { GoFileDirectory } from "react-icons/go";

const inter = Inter({ subsets: ["latin"] });

export default function Inicio() {
  const [isHeating, setIsHeating] = useState(true);
  const currentTemp = 24; // Temperatura actual en °C
  const [selectedTimeRange, setSelectedTimeRange] = useState('day'); // 'day', 'week', 'month'

  return (
    <main className={`${inter.className} bg-gradient-to-b from-white via-yellow-200 to-red-300 min-h-screen flex flex-col justify-between`}>
      <NextSeo
        title="Inicio | SolarWeave"
        description="Sistema de calefacción solar mediante mallas inteligentes"
        canonical="https://www.SolarWeave.com/"
      />

      {/* Encabezado */}
      <div className="w-full">
        <header className="bg-gradient-to-r from-red-600 to-yellow-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/solarweave-logo.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold ml-10 sm:text-lg">SolarWeave</h1>
          </div>
        </header>
      </div>

      {/* Sección de dispositivos */}
      <div className="flex flex-col px-4 py-6 max-w-full mx-auto sm:max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap sm:text-base">Mis mallas solares</h2>
          <button className="flex items-center justify-center px-2 py-2 w-full sm:w-64 border rounded-md border-red-500/50 bg-white text-red-700 font-bold shadow-lg hover:from-red-600 hover:to-yellow-700 transition duration-300 transform hover:scale-105 sm:ml-0 ml-10">
            <PlusCircleIcon className="h-4 w-4" />
            <span>Añadir</span>
          </button>
        </div>

        {/* Main Sensor Card */}
        <div className="w-full bg-white hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden border-red-100">
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <SunIcon className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-red-700">Malla Solar Principal</h2>
                <p className="text-sm text-gray-500">Ubicada en: Sala de estar</p>
              </div>
              <div
                className={`ml-auto rounded-full h-3 w-3 ${isHeating ? "bg-red-500 animate-pulse" : "bg-gray-300"}`}
              ></div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Temperatura actual</span>
                <span className="text-lg font-bold text-red-700">{currentTemp}°C</span>
              </div>

              {/* Barra de progreso de temperatura */}
              <Progress value={currentTemp * 2} className="h-2 bg-red-100" />

              <div className="mt-6 bg-red-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Temperatura promedio hoy</span>
                  <span className="text-sm font-bold text-red-700">22.5°C</span>
                </div>

                {/* Selector de rango de tiempo */}
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => setSelectedTimeRange('day')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedTimeRange === 'day' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
                  >
                    Día
                  </button>
                  <button 
                    onClick={() => setSelectedTimeRange('week')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedTimeRange === 'week' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
                  >
                    Semana
                  </button>
                  <button 
                    onClick={() => setSelectedTimeRange('month')}
                    className={`px-3 py-1 rounded-full text-sm ${selectedTimeRange === 'month' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}
                  >
                    Mes
                  </button>
                </div>

                <div className="h-24 w-full bg-white rounded-md p-2 overflow-hidden">
                  <div className="relative h-full w-full">
                    {/* Gráfico de temperatura interactivo */}
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-red-500 to-yellow-300 opacity-20 rounded"></div>
                    <div className="absolute bottom-0 left-0 w-[15%] h-[30%] bg-red-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[19%] w-[15%] h-[40%] bg-red-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[38%] w-[15%] h-[60%] bg-red-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[57%] w-[15%] h-[45%] bg-red-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[76%] w-[15%] h-[35%] bg-red-500 rounded-sm mx-[2%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-t border-red-100">
            <button className="flex-1 py-3 text-red-600 hover:bg-red-50 text-sm font-medium">Ver detalles</button>
            <div className="w-px bg-red-100"></div>
            <button className="flex-1 py-3 text-red-600 hover:bg-red-50 text-sm font-medium">Historial</button>
          </div>
        </div>
      </div>

       {/* Additional Sensors Placeholder */}
       <div className="bg-red-50 rounded-xl p-6 text-center border border-dashed border-red-200 mb-14">
        <SunIcon className="h-10 w-10 text-red-300 mx-auto mb-3" />
        <h3 className="text-red-700 font-medium mb-1">Añade más mallas solares</h3>
        <p className="text-red-500 text-sm mb-4">Optimiza la calefacción en toda tu casa</p>
        <button className="bg-white text-red-600 border-red-200 px-4 py-2 rounded-full hover:bg-red-100">Explorar dispositivos</button>
      </div>

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
            <GoFileDirectory  className="w-6 h-6 mb-1" />
            <span className="text-xs">Directorio</span>
          </button>
        </Link>
        <Link href="/perfil" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:bg-red-50 rounded-lg transition-colors">
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </Link>
      </nav>
    </main>
  );
}