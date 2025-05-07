'use client';

import Image from 'next/image';
import Link from 'next/link';

const GamesSection = () => {
  const games = [
    {
      id: 1,
      title: 'Explota los Soles',
      description: '¡Haz explotar los soles para generar energía y calentar tu casa!',
      image: '/Juegos/solar-burst.png',
      path: '/games/SolarBurst'
    },
    {
      id: 2,
      title: 'Conecta la Energía',
      description: 'Conecta las mallas solares para crear el circuito perfecto',
      image: '/Juegos/solar-connect.png',
      path: '/games/SolarConnect'
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Juegos Solares</h2>
      <div className="grid grid-cols-1 gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            href={game.path}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-red-100"
          >
            <div className="relative h-40">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-red-600">{game.title}</h3>
              <p className="text-gray-600">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GamesSection; 