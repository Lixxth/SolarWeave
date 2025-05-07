import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Button() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (status === "loading") {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center z-50 space-y-3 px-4 w-full max-w-xs sm:max-w-sm">
        <span className="text-center text-base sm:text-lg font-semibold text-gray-700">
          Iniciaste sesión como:
          <br />
          <span className="text-blue-600 break-all">{session.user.email}</span>
        </span>
        <button
          onClick={() => router.push("/JuegosyConsejos")} 
          className="w-full px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Ir a Inicio
        </button>
        <button
          onClick={() => signOut()}
          className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition duration-200 shadow-md"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center z-50 space-y-6 px-4 w-full max-w-sm">
     <p className="font-semibold text-xl sm:text-2xl text-white drop-shadow-lg mt-4">
  ¡Únete a nuestra comunidad!
</p>

      <button
        onClick={() => signIn("google", { callbackUrl: "/inicio" })}
        className="flex items-center justify-center px-6 py-4 w-full sm:w-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
      >
        <FcGoogle className="text-2xl mr-3" />
        Inicia sesión con Google
      </button>
    </div>
  );
}
