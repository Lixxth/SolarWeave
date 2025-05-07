import { useRouter } from 'next/router';
import Image from 'next/image';
import { SunIcon } from 'lucide-react';

export default function EnDesarrollo() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-200 to-red-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Image 
            src="/solarweave-logo.png" 
            alt="SolarWeave Logo" 
            width={80} 
            height={80}
            className="mx-auto"
          />
        </div>
        <div className="flex justify-center mb-4">
          <SunIcon className="w-12 h-12 text-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          🚧 En Desarrollo 🚧
        </h1>
        <p className="text-gray-600 mb-6">
          Estamos mejorando esta sección para brindarte la mejor experiencia con tus mallas solares. ¡Vuelve pronto!
        </p>
        <button 
          onClick={() => router.back()}
          className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-bold hover:from-red-700 hover:to-yellow-600 transition-all transform hover:scale-105 shadow-lg"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
} 