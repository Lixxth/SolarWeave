'use client';

import { useState } from 'react';

const GameAccessModal = ({ isOpen, onClose, onAccessGranted }) => {
  const [code, setCode] = useState('');
  const correctCode = '123'; // Código de acceso: 123

  const handleNumberClick = (number) => {
    if (code.length < 3) {
      setCode(code + number);
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const handleSubmit = () => {
    if (code === correctCode) {
      onAccessGranted();
      onClose();
    } else {
      setCode('');
      alert('Código incorrecto. Intenta de nuevo.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Acceso a Juegos</h2>
        <p className="text-center text-gray-600 mb-4">
          Ingresa el código de 3 dígitos
        </p>
        
        {/* Display del código */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl font-bold"
              >
                {code[index] || ''}
              </div>
            ))}
          </div>
        </div>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number.toString())}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-xl font-bold"
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="bg-red-100 hover:bg-red-200 p-4 rounded-lg text-xl font-bold"
          >
            ←
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-xl font-bold"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-100 hover:bg-green-200 p-4 rounded-lg text-xl font-bold"
          >
            ✓
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default GameAccessModal; 