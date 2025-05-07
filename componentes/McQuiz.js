import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrophy, FaClock, FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const McQuiz = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);

  const allQuestions = [
    {
      question: "¿Qué porcentaje del cuerpo humano está compuesto por agua?",
      options: ["50%", "60%", "70%", "80%"],
      correctAnswer: "60%"
    },
    {
      question: "¿Cuál es el estado físico del agua a 0°C a nivel del mar?",
      options: ["Líquido", "Sólido", "Gas", "Plasma"],
      correctAnswer: "Sólido"
    },
    {
      question: "¿Qué porcentaje del agua del planeta es apta para consumo humano?",
      options: ["10%", "5%", "2.5%", "0.03%"],
      correctAnswer: "2.5%"
    },
    {
      question: "¿Qué ciclo natural describe el movimiento del agua en la Tierra?",
      options: ["Ciclo del agua", "Ciclo del clima", "Ciclo terrestre", "Ciclo ecológico"],
      correctAnswer: "Ciclo del agua"
    },
    {
      question: "¿Qué proceso convierte el agua líquida en vapor?",
      options: ["Condensación", "Evaporación", "Precipitación", "Infiltración"],
      correctAnswer: "Evaporación"
    },
    {
      question: "¿Qué organismo mundial declara el 22 de marzo como el Día Mundial del Agua?",
      options: ["ONU", "OMS", "UNESCO", "FAO"],
      correctAnswer: "ONU"
    },
    {
      question: "¿Cuál es una forma de ahorrar agua en casa?",
      options: ["Dejar el grifo abierto", "Bañarse por más de 20 minutos", "Usar regaderas ahorradoras", "Lavar el auto con manguera"],
      correctAnswer: "Usar regaderas ahorradoras"
    },
    {
      question: "¿Qué contaminante afecta más frecuentemente al agua potable?",
      options: ["Plomo", "Azúcar", "Oxígeno", "Nitrógeno"],
      correctAnswer: "Plomo"
    },
    {
      question: "¿Cómo se llama el proceso que limpia el agua para que sea potable?",
      options: ["Evaporación", "Destilación", "Filtración", "Tratamiento"],
      correctAnswer: "Tratamiento"
    },
    {
      question: "¿Cuál es el estado del agua en forma de nieve o granizo?",
      options: ["Líquido", "Gas", "Sólido", "Plasma"],
      correctAnswer: "Sólido"
    }
  ];

  useEffect(() => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showScore]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setSelectedAnswer(null);
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
  };

  const handleReturnToMenu = () => {
    router.push('/JuegosyConsejos'); // Cambia la ruta según tu estructura de carpetas
  };

  if (questions.length === 0) {
    return <div className="min-h-screen bg-[#FFE5B4] flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 max-w-2xl w-full">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c0f4a] mb-4">¡Quiz Completado!</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <FaTrophy className="w-8 h-8 text-[#2200ff]" />
              <p className="text-xl md:text-2xl">
                Tu puntuación: {score} de {questions.length}
              </p>
            </div>
            <button
              onClick={handleReturnToMenu}
              className="w-full md:w-auto bg-[#280e50] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#407ade] transition-colors flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="w-5 h-5" />
              Regresar al menú
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#21219d] mb-2 md:mb-0">
                Pregunta {currentQuestion + 1} de {questions.length}
              </h2>
              <div className="flex items-center gap-2">
                <FaClock className="w-6 h-6 text-[#241676]" />
                <span className="text-lg md:text-xl font-bold text-[#29bed5]">
                  Tiempo: {timeLeft}s
                </span>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-bold mb-4">{questions[currentQuestion].question}</h3>
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`p-3 md:p-4 rounded-lg text-left transition-colors flex items-center justify-between ${
                      selectedAnswer === option
                        ? option === questions[currentQuestion].correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    disabled={selectedAnswer !== null}
                  >
                    <span>{option}</span>
                    {selectedAnswer === option && (
                      option === questions[currentQuestion].correctAnswer
                        ? <FaCheckCircle className="w-6 h-6" />
                        : <FaTimesCircle className="w-6 h-6" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {selectedAnswer && (
              <div className="text-center">
                <button
                  onClick={handleNextQuestion}
                  className="w-full md:w-auto bg-[#0e0e5a] text-[#ffffff] font-bold py-3 px-8 rounded-lg hover:bg-[#0095ff] transition-colors flex items-center justify-center gap-2"
                >
                  {currentQuestion + 1 === questions.length ? 'Finalizar' : 'Siguiente'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default McQuiz;
