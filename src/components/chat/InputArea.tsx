import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  border-top: 1px solid var(--color-border);
  padding: 16px;
  background-color: var(--color-bg-primary);
  
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 8px 12px;
  
  @media (max-width: 768px) {
    gap: 8px;
    padding: 6px 10px;
  }
`;

const StyledTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  padding: 8px 0;
  font-family: inherit;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: var(--color-text-secondary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const IconButton = styled.button<{ isStop?: boolean }>`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-border);
    color: var(--color-text-primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 20px; /* Чуть больше для тач-устройств */
  }
`;

const SendButton = styled(IconButton)<{ hasContent: boolean }>`
  color: ${props => props.hasContent ? '#007bff' : 'var(--color-text-secondary)'};
`;

interface InputAreaProps {
  onSendMessage?: (message: string) => void;
  onStopGeneration?: () => void;
  isLoading?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  onSendMessage, 
  onStopGeneration,
  isLoading = false 
}) => {
  // Значение textarea хранится в useState, обновляется через onChange
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Автоматическая подстройка высоты textarea
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };
  
  useEffect(() => {
    adjustHeight();
  }, [message]);
  
  // Отправка по Enter, перенос строки по Shift+Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Отправка сообщения по кнопке
  const handleSend = () => {
    // Отправка пустого сообщения запрещена (проверка на пробелы)
    if (message.trim() && !isLoading) {
      onSendMessage?.(message);
      setMessage(''); // Очищаем поле после отправки
      
      // Сбрасываем высоту textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleAttach = () => {
    console.log('Attach image - заглушка');
  };
  
  // Проверяем, есть ли текст (не только пробелы)
  const hasContent = message.trim().length > 0;
  
  return (
    <InputContainer>
      <InputWrapper>
        <StyledTextarea
          ref={textareaRef}
          value={message}                    // значение из useState
          onChange={(e) => setMessage(e.target.value)}  // обновление через onChange
          onKeyDown={handleKeyDown}          // обработка Enter
          placeholder="Введите сообщение..."
          rows={1}
          disabled={isLoading}
        />
        
        <ButtonsContainer>
          <IconButton 
            onClick={handleAttach} 
            title="Прикрепить изображение" 
            disabled={isLoading}
          >
            📎
          </IconButton>
          
          {isLoading ? (
            <IconButton isStop onClick={onStopGeneration} title="Остановить генерацию">
              ⏹
            </IconButton>
          ) : (
            <SendButton 
              hasContent={hasContent} 
              onClick={handleSend}
              disabled={!hasContent}        // кнопка неактивна при пустом вводе
              title="Отправить"
            >
              ➤
            </SendButton>
          )}
        </ButtonsContainer>
      </InputWrapper>
    </InputContainer>
  );
};

export default InputArea;