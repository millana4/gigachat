import React, { useState } from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { mockMessages, Message } from '../../utils/mockData';

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
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  
  const handleSendMessage = (message: string) => {
    console.log('Send message:', message);
    
    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Имитируем получение ответа через 2 секунды
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Это тестовый ответ от ассистента. Я обработал ваш запрос.',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleStopGeneration = () => {
    console.log('Stop generation');
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