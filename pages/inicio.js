import Image from "next/image";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";
import { PlusCircleIcon, DropletIcon, HomeIcon, BarChart2Icon, UserIcon } from "lucide-react"; // Si usas 'lucide-react' para los iconos
import { useState } from "react"; // Asegúrate de importar useState para manejar el estado
import Progress from './Progress'; // Componente de progreso, si no lo tienes, lo definimos abajo
import Link from 'next/link'; // Importamos Link para la navegación
import { GoFileDirectory } from "react-icons/go";


const inter = Inter({ subsets: ["latin"] });

export default function Inicio() {
  // Definir el estado isFlowing y currentFlow
  const [isFlowing, setIsFlowing] = useState(true); // Cambiar a false si no quieres que el flujo sea activo
  const currentFlow = 5; // Ejemplo de flujo actual en L/min

  return (
    <main className={`${inter.className} bg-white min-h-screen flex flex-col justify-between`}>
      <NextSeo
        title="Inicio | LeakTracking"
        description="Plataforma de monitoreo de fugas de agua"
        canonical="https://www.LeakTracking.com/"
      />

      {/* Encabezado */}
      <div className="w-full">
        <header className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/leakT.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold ml-10 sm:text-lg">LeakTracking</h1>
          </div>
        </header>
      </div>

      {/* Sección de dispositivos */}
      <div className="flex flex-col px-4 py-6 max-w-full mx-auto sm:max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap sm:text-base">Mis dispositivos</h2>
          <button className="flex items-center justify-center px-2 py-2 w-full sm:w-64 border rounded-md border-sky-500/50 bg-white text-blue-700 font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 sm:ml-0 ml-10">
            <PlusCircleIcon className="h-4 w-4" />
            <span>Añadir</span>
          </button>
        </div>

        {/* Main Sensor Card */}
        <div className="w-full bg-white hover:shadow-lg transition-all duration-300 mb-6 overflow-hidden border-blue-100">
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="/medidor.png" alt="Sensor" width={40} height={40} className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-700">Sensor Cocina</h2>
                <p className="text-sm text-gray-500">Ubicado en: Cocina principal</p>
              </div>
              <div
                className={`ml-auto rounded-full h-3 w-3 ${isFlowing ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
              ></div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Flujo actual</span>
                <span className="text-lg font-bold text-blue-700">{currentFlow} L/min</span>
              </div>

              {/* Barra de progreso */}
              <Progress value={currentFlow * 10} className="h-2 bg-blue-100" />

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Consumo hoy</span>
                  <span className="text-sm font-bold text-blue-700">128.5 L</span>
                </div>
                <div className="h-24 w-full bg-white rounded-md p-2 overflow-hidden">
                  <div className="relative h-full w-full">
                    {/* Simplified chart visualization */}
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-blue-500 to-blue-300 opacity-20 rounded"></div>
                    <div className="absolute bottom-0 left-0 w-[15%] h-[30%] bg-blue-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[19%] w-[15%] h-[40%] bg-blue-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[38%] w-[15%] h-[60%] bg-blue-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[57%] w-[15%] h-[45%] bg-blue-500 rounded-sm mx-[2%]"></div>
                    <div className="absolute bottom-0 left-[76%] w-[15%] h-[35%] bg-blue-500 rounded-sm mx-[2%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-t border-blue-100">
            <button className="flex-1 py-3 text-blue-600 hover:bg-blue-50 text-sm font-medium">Ver detalles</button>
            <div className="w-px bg-blue-100"></div>
            <button className="flex-1 py-3 text-blue-600 hover:bg-blue-50 text-sm font-medium">Historial</button>
          </div>
        </div>
      </div>

       {/* Additional Sensors Placeholder */}
       <div className="bg-blue-50 rounded-xl p-6 text-center border border-dashed border-blue-200 mb-14">
        <DropletIcon className="h-10 w-10 text-blue-300 mx-auto mb-3" />
        <h3 className="text-blue-700 font-medium mb-1">Añade más sensores</h3>
        <p className="text-blue-500 text-sm mb-4">Monitorea el consumo de agua en toda tu casa</p>
        <button className="bg-white text-blue-600 border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100">Explorar dispositivos</button>
      </div>

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
    </main>
  );
}