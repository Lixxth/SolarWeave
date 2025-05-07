'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  PlusCircleIcon,
  DropletIcon,
  HomeIcon,
  BarChart2Icon,
  UserIcon,
} from "lucide-react"; // Si usas 'lucide-react' para los iconos
import { GoFileDirectory } from "react-icons/go";

const ProfileScreen = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Datos de ejemplo para el nivel y progreso
  const userLevel = 1;
  const currentPoints = 15;
  const pointsForNextLevel = 500;
  const progress = (currentPoints / pointsForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado */}
      <div className="w-full">
        <header className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/leakT.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold ml-10 sm:text-lg"></h1>
          </div>
        </header>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto p-4">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <img
                src={user?.image || "/avatar.png"}
                alt="Profile"
                className="rounded-full object-cover w-24 h-24"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user?.name || "Usuario"}
              </h2>
              <p className="text-gray-600">
                {user?.email || "usuario@ejemplo.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Level Progress Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-800">
              Flujo total de agua{" "}
            </h3>
            <span className="text-[#D6001C] font-bold">
              {currentPoints}/{pointsForNextLevel} centimetros cubicos
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-[#27f654] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            El flujo es {currentPoints} es un flujo normal de agua para tu casa.
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Mis Dispositivos
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#201a6a]">0</p>
              <p className="text-gray-600">Dispositivos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#201a6a]">
                {currentPoints}
              </p>
              <p className="text-gray-600">alertas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#201a6a]">0</p>
              <p className="text-gray-600">visitas</p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-20">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Configuración
          </h3>
          <div className="space-y-4">
            <Link
              href="/en-desarrollo"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚙️</span>
                <span>Llamar un plomero</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/en-desarrollo"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎁</span>
                <span>Mis Recompensas</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/en-desarrollo"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💳</span>
                <span>Métodos de Pago</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>

            {/* Cerrar sesión */}
            <button
               onClick={() => signOut({ callbackUrl: "http://localhost:3000" })} // Redirige a localhost:3000
              className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition duration-200 shadow-md"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}

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

export default ProfileScreen;
