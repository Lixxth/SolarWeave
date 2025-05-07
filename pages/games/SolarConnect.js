'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

const SolarConnect = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [selectedMesh, setSelectedMesh] = useState(null);
  const [connections, setConnections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const router = useRouter();

  // Configuración de niveles
  const levelConfig = {
    1: {
      meshes: 3,
      time: 60,
      points: 100
    },
    2: {
      meshes: 4,
      time: 90,
      points: 200
    },
    3: {
      meshes: 5,
      time: 120,
      points: 300
    }
  };

  // Generar mallas para el nivel actual
  const generateMeshes = () => {
    const meshes = [];
    const numMeshes = levelConfig[level].meshes;
    
    for (let i = 0; i < numMeshes; i++) {
      meshes.push({
        id: i,
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * (window.innerHeight - 300) + 100,
        connected: false,
        type: Math.random() > 0.5 ? 'source' : 'receiver'
      });
    }
    return meshes;
  };

  const [meshes, setMeshes] = useState([]);

  // Iniciar el juego
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(levelConfig[1].time);
    setMeshes(generateMeshes());
    setConnections([]);
  };

  // Manejar clic en malla
  const handleMeshClick = (mesh) => {
    if (!gameActive) return;

    if (!selectedMesh) {
      if (mesh.type === 'source') {
        setSelectedMesh(mesh);
      }
    } else {
      if (mesh.type === 'receiver' && mesh.id !== selectedMesh.id) {
        // Crear conexión
        const newConnection = {
          from: selectedMesh.id,
          to: mesh.id
        };
        setConnections([...connections, newConnection]);
        
        // Actualizar estado de las mallas
        setMeshes(prevMeshes => 
          prevMeshes.map(m => 
            m.id === mesh.id ? { ...m, connected: true } : m
          )
        );

        // Verificar si se completó el nivel
        const allConnected = meshes.every(m => 
          m.type === 'source' || m.connected
        );

        if (allConnected) {
          setScore(prev => prev + levelConfig[level].points);
          if (level < 3) {
            setLevel(prev => prev + 1);
            setMeshes(generateMeshes());
            setTimeLeft(levelConfig[level + 1].time);
          } else {
            setGameActive(false);
          }
        }
      }
      setSelectedMesh(null);
    }
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
          <h1 className="text-2xl font-bold">Conecta la Energía</h1>
          <p className="text-sm">Crea el circuito perfecto</p>
        </div>
        <div className="w-24"></div>
      </header>

      {/* Game Stats */}
      <div className="fixed top-20 left-0 right-0 flex justify-center gap-8 p-4 bg-white/80 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-sm text-gray-600">Puntuación</p>
          <p className="text-2xl font-bold text-red-600">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Nivel</p>
          <p className="text-2xl font-bold text-red-600">{level}</p>
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
                : 'Conecta las mallas solares para crear energía'}
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
            {/* Conexiones */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, index) => {
                const fromMesh = meshes.find(m => m.id === conn.from);
                const toMesh = meshes.find(m => m.id === conn.to);
                return (
                  <line
                    key={index}
                    x1={fromMesh.x + 50}
                    y1={fromMesh.y + 50}
                    x2={toMesh.x + 50}
                    y2={toMesh.y + 50}
                    stroke="#ef4444"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {/* Mallas */}
            {meshes.map(mesh => (
              <button
                key={mesh.id}
                onClick={() => handleMeshClick(mesh)}
                className={`absolute transition-transform hover:scale-110 ${
                  selectedMesh?.id === mesh.id ? 'ring-4 ring-red-500' : ''
                } ${mesh.connected ? 'opacity-50' : ''}`}
                style={{
                  left: `${mesh.x}px`,
                  top: `${mesh.y}px`,
                }}
              >
                <Image
                  src={mesh.type === 'source' ? '/Juegos/sol.png' : '/Juegos/solar-receiver.png'}
                  alt={mesh.type === 'source' ? 'Fuente solar' : 'Receptor solar'}
                  width={100}
                  height={100}
                  className={mesh.connected ? 'animate-pulse' : ''}
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
            Conecta las fuentes solares (amarillas) con los receptores (rojos) para crear energía. ¡Completa todos los niveles!
          </p>
        </div>
      )}
    </div>
  );
};

export default SolarConnect; 