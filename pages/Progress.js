const Progress = ({ value, className }) => {
    return (
      <div className={`relative pt-1 ${className}`}>
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${value}%` }} // Asegúrate de que el valor esté entre 0 y 100
          />
        </div>
      </div>
    );
  };
  
  export default Progress;
  