'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  BarChart2Icon,
  UserIcon,
  SunIcon,
  ThermometerIcon,
  SettingsIcon
} from "lucide-react";

const ProfileScreen = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Datos de ejemplo para el nivel y progreso
  const userLevel = 1;
  const currentPoints = 15;
  const pointsForNextLevel = 500;
  const progress = (currentPoints / pointsForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-200 to-red-300">
      {/* Encabezado */}
      <div className="w-full">
        <header className="bg-gradient-to-r from-red-600 to-yellow-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/solarweave-logo.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold ml-10 sm:text-lg">SolarWeave</h1>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
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
              <h2 className="text-xl font-bold text-red-600">
                {user?.name || "Usuario"}
              </h2>
              <p className="text-gray-600">
                {user?.email || "usuario@ejemplo.com"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  Nivel {userLevel}
                </span>
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  {currentPoints} puntos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-red-600">
              Eficiencia Solar
            </h3>
            <span className="text-red-600 font-bold">
              {currentPoints}/{pointsForNextLevel} kWh
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-red-500 to-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Tu sistema está generando {currentPoints} kWh de energía solar.
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-red-600 mb-4">
            Mis Mallas Solares
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-gray-600">Mallas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                24°C
              </p>
              <p className="text-gray-600">Temperatura</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">92%</p>
              <p className="text-gray-600">Eficiencia</p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-20">
          <h3 className="text-lg font-bold text-red-600 mb-4">
            Configuración
          </h3>
          <div className="space-y-4">
            <Link
              href="/en-desarrollo"
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <div className="flex items-center space-x-3">
                <SunIcon className="w-6 h-6 text-red-600" />
                <span>Gestionar Mallas</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/en-desarrollo"
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <div className="flex items-center space-x-3">
                <ThermometerIcon className="w-6 h-6 text-red-600" />
                <span>Historial de Temperatura</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href="/en-desarrollo"
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <div className="flex items-center space-x-3">
                <BarChart2Icon className="w-6 h-6 text-red-600" />
                <span>Estadísticas</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>

            {/* Cerrar sesión */}
            <button
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold hover:from-red-700 hover:to-yellow-600 transition duration-200 shadow-md"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 px-2 shadow-lg z-50">
        <Link href="/inicio" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Inicio</span>
          </button>
        </Link>
        <Link href="/JuegosyConsejos" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <BarChart2Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">Juegos</span>
          </button>
        </Link>
        <Link href="/dispositivos" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <SunIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Instaladores</span>
          </button>
        </Link>
        <Link href="/perfil" passHref>
          <button className="flex flex-col items-center py-1 px-3 text-red-600 bg-red-50 rounded-lg">
            <UserIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default ProfileScreen;
