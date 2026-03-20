import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  border-top: 1px solid var(--color-border);
  padding: 16px;
  background-color: var(--color-bg-primary);
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
`;

const IconButton = styled.button<{ isStop?: boolean }>`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--color-border);
    color: var(--color-text-primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  // useState для хранения значения поля ввода
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
  
  // Обработка нажатия Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Отправка сообщения
  const handleSend = () => {
    // Проверяем: сообщение не пустое и не идет загрузка
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
  
  return (
    <InputContainer>
      <InputWrapper>
        <StyledTextarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите сообщение..."
          rows={1}
          disabled={isLoading} // Блокируем поле ввода во время загрузки
        />
        
        <ButtonsContainer>
          <IconButton onClick={handleAttach} title="Прикрепить изображение" disabled={isLoading}>
            📎
          </IconButton>
          
          {isLoading ? (
            <IconButton isStop onClick={onStopGeneration} title="Остановить генерацию">
              ⏹
            </IconButton>
          ) : (
            <SendButton 
              hasContent={message.trim().length > 0} 
              onClick={handleSend}
              disabled={!message.trim() || isLoading} // Блокируем кнопку при пустом вводе или загрузке
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