
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingEffect from './TypingEffect';

const TerminalScreen: React.FC = () => {
  const [isGreetingDone, setIsGreetingDone] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showInputField, setShowInputField] = useState(false);
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const greetingText = `СИСТЕМА СПЕЦДОСТУПА ИОН-КТП19 (c) 1986-1995
ВЕРСИЯ ПО: 4.3.1
ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...
УСПЕШНО
ДАТА: ${currentDate} ВРЕМЯ: ${currentTime}

ДОБРО ПОЖАЛОВАТЬ, ОПЕРАТОР
`;

  const accessText = "ВВЕДИТЕ НАЗВАНИЕ ФАЙЛА ДЛЯ ДОСТУПА:";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.trim().toLowerCase() === 'эндермен') {
      navigate('/secret');
    } else {
      setErrorMessage('ОШИБКА: ФАЙЛ НЕ НАЙДЕН. ПОПРОБУЙТЕ СНОВА.');
      setUserInput('');
    }
  };

  useEffect(() => {
    if (isGreetingDone) {
      setTimeout(() => {
        setShowAccessPrompt(true);
      }, 500);
    }
  }, [isGreetingDone]);

  useEffect(() => {
    if (showAccessPrompt) {
      setTimeout(() => {
        setShowInputField(true);
      }, 1000);
    }
  }, [showAccessPrompt]);

  return (
    <div className="min-h-screen flex flex-col p-8 crt-effect overflow-hidden">
      <div className="scan-line-container">
        <div className="scan-line animate-scan-line"></div>
      </div>
      <div className="terminal-window flex-1 flex flex-col">
        <div className="terminal-output whitespace-pre-line mb-4">
          <TypingEffect
            text={greetingText}
            speed={30}
            onComplete={() => setIsGreetingDone(true)}
          />
          
          {showAccessPrompt && (
            <div className="mt-4">
              <TypingEffect
                text={accessText}
                speed={50}
                delay={500}
              />
            </div>
          )}
          
          {errorMessage && (
            <div className="mt-2 text-red-500">
              {errorMessage}
            </div>
          )}
        </div>
        
        {showInputField && (
          <form onSubmit={handleSubmit} className="flex items-center terminal-prompt mt-2">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="terminal-input bg-transparent w-full px-2 py-1 focus:outline-none"
              autoFocus
            />
          </form>
        )}
      </div>
      
      <div className="terminal-status mt-auto pt-4 text-xs opacity-70 border-t border-terminal-green">
        [СИСТЕМА АКТИВНА] - ДЛЯ ЗАВЕРШЕНИЯ СЕАНСА ВВЕДИТЕ /EXIT
      </div>
    </div>
  );
};

export default TerminalScreen;
