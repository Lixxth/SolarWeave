import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LuTrophy, LuClock, LuArrowLeft } from 'react-icons/lu'; // Importación de íconos de react-icons/lu

const CatchWaterGame = () => {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 segundos de juego
  const [fries, setFries] = useState([]);
  const [boxPosition, setBoxPosition] = useState(50); // posición inicial del box
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Función para mover la caja
  const handleMouseMove = (e) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setBoxPosition(Math.max(0, Math.min(100, percentage)));
    }
  };

  // Función para crear una nueva papa frita
  const createFry = () => {
    const newFry = {
      id: Date.now(),
      x: Math.random() * 100, // posición horizontal aleatoria
      y: 0, // comienza desde arriba
    };
    setFries((prev) => [...prev, newFry]);
  };

  // Función para actualizar la posición de las papas fritas
  const updateFries = () => {
    setFries((prev) =>
      prev
        .map((fry) => ({
          ...fry,
          y: fry.y + 2, // velocidad de caída
        }))
        .filter((fry) => {
          // Verificar si la papa frita fue atrapada
          if (fry.y >= 80 && Math.abs(fry.x - boxPosition) < 15) {
            setScore((s) => s + 1);
            return false;
          }
          // Eliminar papas fritas que cayeron fuera de la pantalla
          return fry.y < 100;
        })
    );
  };

  // Iniciar el juego
  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setShowReward(false);
    setChestOpen(false);
    setTimeLeft(30);
    setFries([]);
    setBoxPosition(50);

    // Crear papas fritas cada 500ms
    const fryInterval = setInterval(createFry, 500);

    // Actualizar el juego cada 16ms (60fps)
    const gameInterval = setInterval(() => {
      updateFries();
    }, 16);

    // Temporizador
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(fryInterval);
          clearInterval(gameInterval);
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    gameLoopRef.current = { fryInterval, gameInterval, timer };
  };

  // Función para mostrar la recompensa
  const showRewardScreen = () => {
    setShowReward(true);
    // Abrir el cofre después de 1 segundo
    setTimeout(() => {
      setChestOpen(true);
    }, 1000);
  };

  // Función para regresar al menú principal
  const handleReturnToMenu = () => {
    router.push('/JuegosyConsejos'); // Cambia la ruta según tu estructura de carpetas
  };

  // Limpiar intervalos al desmontar
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        Object.values(gameLoopRef.current).forEach(clearInterval);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#181047] mb-2">
          ¡Riega la planta!
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <LuTrophy className="w-6 h-6 text-[#791e80]" /> {/* Reemplazo del ícono */}
            <p className="text-lg md:text-xl font-bold text-[#23177e]">
              Puntos: {score}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LuClock className="w-6 h-6 text-[#521257]" /> {/* Reemplazo del ícono */}
            <p className="text-lg md:text-xl font-bold text-[#1a1976]">
              Tiempo: {timeLeft} s
            </p>
          </div>
        </div>
      </div>

      {showReward ? (
        <div className="text-center w-full max-w-md">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
            <div
              className={`absolute inset-0 transition-transform duration-1000 ${chestOpen ? 'scale-110' : 'scale-100'}`}
            >
              <Image
                src={chestOpen ? '/chest-open.png' : '/chest-closed.png'}
                alt="Cofre de recompensa"
                fill
                className="object-contain"
              />
            </div>
            {chestOpen && (
              <div className="absolute inset-0 animate-bounce">
                <Image
                  src="/prize.png"
                  alt="Premio"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#D6001C] mb-4">
            ¡Felicidades!
          </h2>
          <p className="text-lg md:text-xl mb-4">Has ganado {score} puntos</p>
          <button
            onClick={handleReturnToMenu}
            className="w-full md:w-auto bg-[#D6001C] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#B30000] transition-colors flex items-center justify-center gap-2"
          >
            <LuArrowLeft className="w-5 h-5" /> {/* Reemplazo del ícono */}
            Regresar al menú
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-[#101047] mb-4">
            ¡Juego Terminado!
          </h2>
          <p className="text-lg md:text-xl mb-4">Puntuación final: {score}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={showRewardScreen}
              className="w-full md:w-auto bg-[#0d581f] text-[#ffffff] font-bold py-3 px-8 rounded-lg hover:bg-[#4e7451] transition-colors flex items-center justify-center gap-2"
            >
              <LuTrophy className="w-5 h-5" /> {/* Reemplazo del ícono */}
              Ver Recompensa
            </button>
            <button
              onClick={handleReturnToMenu}
              className="w-full md:w-auto bg-[#3a51ff] text-[#ffffff] font-bold py-3 px-8 rounded-lg hover:bg-[#0e1354] transition-colors flex items-center justify-center gap-2"
            >
              <LuArrowLeft className="w-5 h-5" /> {/* Reemplazo del ícono */}
              Regresar al menú
            </button>
          </div>           
        </div>
      ) : (
        <div
          ref={gameAreaRef}
          className="relative w-full max-w-md h-[300px] md:h-[500px] bg-white rounded-lg overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = gameAreaRef.current.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            setBoxPosition(Math.max(0, Math.min(100, percentage)));
          }}
          onClick={!gameLoopRef.current ? startGame : undefined}
        >
          {/* Papas fritas cayendo */}
          {fries.map((fry) => (
            <div
              key={fry.id}
              className="absolute w-6 h-6 md:w-8 md:h-8"
              style={{
                left: `${fry.x}%`,
                top: `${fry.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Image
                src="/Juegos/Gota-removebg-preview.png"
                alt="Papas fritas"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          ))}

          {/* Caja de McDonald's */}
          <div
            className="absolute bottom-0 w-24 h-24 md:w-32 md:h-32"
            style={{
              left: `${boxPosition}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <Image
              src="/Juegos/maceta-removebg-preview.png"
              alt="Caja de McDonald's"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>

          {!gameLoopRef.current && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <button
                onClick={startGame}
                className="bg-[#3a51ff] text-[#ffffff] font-bold py-3 px-8 rounded-lg hover:bg-[#0e1354] transition-colors"
              >
                ¡Comenzar!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CatchWaterGame;
