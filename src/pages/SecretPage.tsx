
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingEffect from '../components/TypingEffect';

const SecretPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const loadingText = "ЗАГРУЗКА ЗАСЕКРЕЧЕННОГО ФАЙЛА...\nЗагрузка: ██████████ 100%\nДОСТУП РАЗРЕШЕН.";

  useEffect(() => {
    document.title = "ФАЙЛ: ЭНДЕРМЕН - ДОСТУП РАЗРЕШЕН";
    
    return () => {
      document.title = "СИСТЕМА СПЕЦДОСТУПА";
    };
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col p-8 crt-effect bg-terminal-black text-terminal-green">
      <div className="scan-line-container">
        <div className="scan-line animate-scan-line"></div>
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl mb-4">ФАЙЛ: ЭНДЕРМЕН</h1>
        <div className="mb-6">
          <TypingEffect
            text={loadingText}
            speed={40}
            onComplete={() => {
              setLoaded(true);
              setTimeout(() => setShowImage(true), 500);
            }}
            className="whitespace-pre-line"
          />
        </div>
        
        {loaded && (
          <div className="border-t border-b border-terminal-green py-4 mb-6">
            <p className="mb-2">КЛАССИФИКАЦИЯ: СТРОГО СЕКРЕТНО</p>
            <p className="mb-2">ДАТА ДОБАВЛЕНИЯ: 12.06.2011</p>
            <p>СТАТУС: АКТИВЕН</p>
          </div>
        )}
        
        {showImage && (
          <div className="flex flex-col items-center mt-6 mb-8 animate-in fade-in duration-500">
            <div className="border border-terminal-green p-2 bg-black mb-4 w-full max-w-md">
              <img 
                src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/bd/Enderman_JE4.png" 
                alt="Эндермен" 
                className="w-full max-w-md mx-auto filter brightness-110"
              />
            </div>
            <div className="text-sm opacity-70 max-w-md">
              Существо, обнаруженное исследователями НПКА в измерении "Край". Обладает способностью телепортации и проявляет агрессию при прямом зрительном контакте.
            </div>
          </div>
        )}
        
        <button 
          onClick={handleGoBack}
          className="mt-8 border border-terminal-green px-4 py-2 hover:bg-terminal-darkGreen hover:text-black transition duration-300"
        >
          ВЕРНУТЬСЯ К ТЕРМИНАЛУ
        </button>
      </div>
    </div>
  );
};

export default SecretPage;
