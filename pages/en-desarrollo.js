import { useRouter } from 'next/router';
import Image from 'next/image';

export default function EnDesarrollo() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Image 
            src="/leakT.png" 
            alt="Logo" 
            width={80} 
            height={80}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🚧 En Desarrollo 🚧
        </h1>
        <p className="text-gray-600 mb-6">
          Esta sección está siendo mejorada. ¡Vuelve pronto por más sorpresas!
        </p>
        <button 
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
} 