'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

const SolarBurst = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [suns, setSuns] = useState([]);
  const router = useRouter();

  // Función para crear un nuevo sol
  const createSun = () => {
    const newSun = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 200),
      size: Math.random() * 30 + 50, // Tamaño aleatorio entre 50 y 80
      points: Math.floor(Math.random() * 3) + 1, // Puntos aleatorios entre 1 y 3
    };
    setSuns(prevSuns => [...prevSuns, newSun]);
  };

  // Función para explotar un sol
  const burstSun = (id, points) => {
    setScore(prevScore => prevScore + points);
    setSuns(prevSuns => prevSuns.filter(sun => sun.id !== id));
  };

  // Iniciar el juego
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setSuns([]);
  };

  // Efecto para el temporizador
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  // Efecto para generar soles
  useEffect(() => {
    let sunGenerator;
    if (gameActive) {
      sunGenerator = setInterval(() => {
        if (suns.length < 5) { // Máximo 5 soles en pantalla
          createSun();
        }
      }, 1000);
    }
    return () => clearInterval(sunGenerator);
  }, [gameActive, suns.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-200 to-red-300 relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-yellow-500 p-4 text-white flex items-center justify-between">
        <Link href="/JuegosyConsejos">
          <button className="flex items-center gap-2">
            <HomeIcon className="w-6 h-6" />
            <span>Volver</span>
          </button>
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Explota los Soles</h1>
          <p className="text-sm">Genera energía solar</p>
        </div>
        <div className="w-24"></div> {/* Espaciador */}
      </header>

      {/* Game Stats */}
      <div className="fixed top-20 left-0 right-0 flex justify-center gap-8 p-4 bg-white/80 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-sm text-gray-600">Puntuación</p>
          <p className="text-2xl font-bold text-red-600">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Tiempo</p>
          <p className="text-2xl font-bold text-red-600">{timeLeft}s</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="pt-32 pb-20 min-h-screen relative">
        {!gameActive ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-3xl font-bold text-red-700 mb-4">
              {timeLeft === 0 ? '¡Juego Terminado!' : '¡Comienza a Jugar!'}
            </h2>
            <p className="text-gray-600 mb-8">
              {timeLeft === 0 
                ? `Tu puntuación final: ${score}`
                : 'Haz clic en los soles para generar energía'}
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-bold hover:from-red-700 hover:to-yellow-600 transition-all transform hover:scale-105"
            >
              {timeLeft === 0 ? 'Jugar de nuevo' : 'Iniciar Juego'}
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {suns.map(sun => (
              <button
                key={sun.id}
                onClick={() => burstSun(sun.id, sun.points)}
                className="absolute transition-transform hover:scale-110"
                style={{
                  left: `${sun.x}px`,
                  top: `${sun.y}px`,
                  width: `${sun.size}px`,
                  height: `${sun.size}px`,
                }}
              >
                <Image
                  src="/Juegos/sol.png"
                  alt="Sol"
                  width={sun.size}
                  height={sun.size}
                  className="animate-pulse"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      {!gameActive && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 p-4 text-center">
          <h3 className="text-lg font-semibold text-red-700 mb-2">¿Cómo jugar?</h3>
          <p className="text-gray-600">
            Haz clic en los soles para explotarlos y generar energía. ¡Cada sol vale diferentes puntos!
          </p>
        </div>
      )}
    </div>
  );
};

export default SolarBurst; 