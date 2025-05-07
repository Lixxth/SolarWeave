import Image from "next/image";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";
import Button from "@/componentes/login-btn";
import OfflineButton from "@/componentes/OfflineButton";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} relative min-h-screen bg-gradient-to-b from-white to-blue-100 overflow-hidden`}>
      <NextSeo
        title="Inicio | AquaDetect"
        description="Plataforma de monitoreo de fugas de agua"
        canonical="https://www.AquaDetect.com/"
      />

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center px-4 pt-16 pb-4 text-center relative z-10">
        <Image
          src="/leakT.png"
          alt="Logo"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-700 leading-relaxed mb-6">
          Bienvenido a <span className="text-blue-600">LeakTracking</span>
          <br />
          Tu ayudante en fugas de agua
        </h1>
        <p className="text-gray-500 mb-10 max-w-md">
          Únete a la comunidad, monitorea tu consumo y <strong>ahorra agua y dinero</strong>.
        </p>
      </div>

      {/* Fondo de olas */}
      <div
          className="w-full h-64 bg-cover bg-bottom pointer-events-none"
          style={{ backgroundImage: "url('/imagenesbg/Olas.png')" }}
        >
           <div className="flex justify-center items-center h-full">
           
            </div>
        </div>

      {/* Botón encima del fondo */}
      <div className="absolute flex-col bottom-24 w-full flex justify-center items-center z-20 px-4 mt-2 ">
        <Button />
        <OfflineButton />
       

      </div>
      
    </main>
  );
}
