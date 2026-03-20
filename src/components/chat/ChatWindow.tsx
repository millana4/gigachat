import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { Message } from '../../utils/mockData';

interface ChatWindowProps {
  activeChatId: string;
  onOpenSettings?: () => void;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg-primary);
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
`;

const ChatTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
  
  &:hover {
    color: var(--color-text-primary);
  }
`;

const ChatWindow: React.FC<ChatWindowProps> = ({ activeChatId, onOpenSettings }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(true);
  
  const addAssistantResponse = useCallback((userMessage: string) => {
    if (!isActiveRef.current) return;
    
    let responseContent = '';
    
    if (userMessage.toLowerCase().includes('привет') || userMessage.toLowerCase().includes('здравствуй')) {
      responseContent = 'Привет! Чем я могу вам помочь?';
    } else if (userMessage.toLowerCase().includes('как дела')) {
      responseContent = 'У меня всё отлично! Я готов помочь вам с любыми вопросами.';
    } else if (userMessage.toLowerCase().includes('спасибо')) {
      responseContent = 'Пожалуйста! Обращайтесь ещё.';
    } else {
      responseContent = `Я получил ваше сообщение: "${userMessage}". Это тестовый ответ от ассистента. В следующих версиях здесь будет реальный ответ от GigaChat API.`;
    }
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  }, []);
  
  const handleSendMessage = (message: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    isActiveRef.current = true;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    timerRef.current = setTimeout(() => {
      addAssistantResponse(message);
      timerRef.current = null;
    }, 2000);
  };
  
  const handleStopGeneration = () => {
    isActiveRef.current = false;
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    setIsLoading(false);
  };
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>
          {activeChatId === '1' ? 'Обсуждение проекта' : 'Чат'}
        </ChatTitle>
        <SettingsButton onClick={onOpenSettings} title="Настройки">
          ⚙️
        </SettingsButton>
      </ChatHeader>
      
      <MessageList messages={messages} isLoading={isLoading} />
      
      <InputArea 
        onSendMessage={handleSendMessage}
        onStopGeneration={handleStopGeneration}
        isLoading={isLoading}
      />
    </ChatContainer>
  );
};

export default ChatWindow;