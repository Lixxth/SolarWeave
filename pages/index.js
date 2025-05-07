import Image from "next/image";
import { NextSeo } from "next-seo";
import { Inter } from "next/font/google";
import Button from "@/componentes/login-btn";
import OfflineButton from "@/componentes/OfflineButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} relative min-h-screen bg-gradient-to-b from-white via-yellow-200 to-red-300 overflow-hidden`}>
      <NextSeo
        title="Inicio | SolarWeave"
        description="Sistema de calefacción solar mediante mallas inteligentes"
        canonical="https://www.SolarWeave.com/"
      />

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center px-4 pt-16 pb-4 text-center relative z-10">
        <Image
          src="/solarweave-logo.png"
          alt="SolarWeave Logo"
          width={250}
          height={250}
          className="mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-800 leading-relaxed mb-6">
          Bienvenido a <span className="text-red-600">SolarWeave</span>
          <br />
          Calefacción solar inteligente
        </h1>
        <p className="text-gray-600 mb-10 max-w-md">
          Descubre el futuro de la calefacción con nuestras mallas solares. <strong>Ahorra energía y cuida el planeta</strong>.
        </p>
      </div>

      {/* Fondo de patrón solar */}
      <div
          className="w-full h-64 bg-cover bg-bottom pointer-events-none"
          style={{ backgroundImage: "url('/imagenesbg/solar-pattern.png')" }}
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
