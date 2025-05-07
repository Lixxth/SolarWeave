'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon, SunIcon, ZapIcon } from 'lucide-react';

const SolarConnect = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [selectedMesh, setSelectedMesh] = useState(null);
  const [connections, setConnections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [energyLevel, setEnergyLevel] = useState(0);
  const router = useRouter();

  // Configuración de niveles
  const levelConfig = {
    1: {
      sources: 2,
      receivers: 2,
      time: 60,
      points: 100,
      energyNeeded: 50
    },
    2: {
      sources: 4,
      receivers: 3,
      time: 90,
      points: 200,
      energyNeeded: 50
    },
    3: {
      sources: 4,
      receivers: 4,
      time: 120,
      points: 300,
      energyNeeded: 50
    }
  };

  // Generar mallas para el nivel actual
  const generateMeshes = () => {
    const meshes = [];
    const config = levelConfig[level];
    
    // Generar fuentes solares
    for (let i = 0; i < config.sources; i++) {
      meshes.push({
        id: `source-${i}`,
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * (window.innerHeight - 300) + 100,
        connected: false,
        type: 'source',
        energy: 30
      });
    }

    // Generar receptores
    for (let i = 0; i < config.receivers; i++) {
      meshes.push({
        id: `receiver-${i}`,
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * (window.innerHeight - 300) + 100,
        connected: false,
        type: 'receiver',
        energy: 0
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
    setEnergyLevel(0);
  };

  // Manejar clic en malla
  const handleMeshClick = (mesh) => {
    if (!gameActive) return;

    if (!selectedMesh) {
      if (mesh.type === 'source' && !mesh.connected) {
        setSelectedMesh(mesh);
      }
    } else {
      if (mesh.type === 'receiver' && !mesh.connected) {
        // Crear conexión
        const newConnection = {
          from: selectedMesh.id,
          to: mesh.id,
          energy: selectedMesh.energy
        };
        setConnections([...connections, newConnection]);
        
        // Actualizar estado de las mallas
        setMeshes(prevMeshes => 
          prevMeshes.map(m => {
            if (m.id === mesh.id) {
              return { ...m, connected: true, energy: selectedMesh.energy };
            }
            if (m.id === selectedMesh.id) {
              return { ...m, connected: true };
            }
            return m;
          })
        );

        // Actualizar nivel de energía
        setEnergyLevel(prev => prev + selectedMesh.energy);

        // Verificar si se completó el nivel
        const config = levelConfig[level];
        if (energyLevel + selectedMesh.energy >= config.energyNeeded) {
          setScore(prev => prev + config.points);
          if (level < 3) {
            setLevel(prev => prev + 1);
            setMeshes(generateMeshes());
            setTimeLeft(levelConfig[level + 1].time);
            setEnergyLevel(0);
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
        <div className="text-center">
          <p className="text-sm text-gray-600">Energía</p>
          <p className="text-2xl font-bold text-yellow-600">{energyLevel}/{levelConfig[level].energyNeeded}</p>
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
                : 'Conecta las fuentes solares con los receptores para generar energía'}
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
                <div className="relative">
                  <Image
                    src={mesh.type === 'source' ? '/Juegos/sol.png' : '/Juegos/solar-receiver.png'}
                    alt={mesh.type === 'source' ? 'Fuente solar' : 'Receptor solar'}
                    width={100}
                    height={100}
                    className={mesh.connected ? 'animate-pulse' : ''}
                  />
                  {mesh.type === 'source' && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      {mesh.energy} kW
                    </div>
                  )}
                  {mesh.type === 'receiver' && mesh.connected && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                      {mesh.energy} kW
                    </div>
                  )}
                </div>
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
            Conecta las fuentes solares (amarillas) con los receptores (rojos) para generar energía. 
            Cada fuente produce 25 kW. ¡Completa el nivel generando la energía necesaria!
          </p>
        </div>
      )}
    </div>
  );
};

export default SolarConnect; 