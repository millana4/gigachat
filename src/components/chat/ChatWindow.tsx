import React, { useCallback } from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { useChatStore } from '../../store/chatStore';
import { Message } from '../../types';
import { getRandomMockResponse } from '../../utils/mockResponses';
import ErrorBoundary from '../ErrorBoundary';
import ErrorMessage from '../ui/ErrorMessage';

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
  const { 
    chats, 
    isLoading, 
    isStreaming, 
    streamingContent,
    error,  
    addMessage, 
    updateLastMessage,
    setLoading,
    setStreaming,
    updateStreamingContent,
    finishStreaming,
    setError
  } = useChatStore();
  
  const currentChat = chats.find(chat => chat.id === activeChatId);
  const messages = currentChat?.messages || [];
  
  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;
    
    // Создаём сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    addMessage(activeChatId, userMessage);
    setLoading(true);
    setStreaming(true);
    
    try {
      const mockResponse = getRandomMockResponse();
      let responseText = '';
      
      // Потоковый вывод
      for (let i = 0; i <= mockResponse.length; i++) {
        responseText = mockResponse.slice(0, i);
        updateStreamingContent(responseText);
        updateLastMessage(activeChatId, responseText);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      
      const finalAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: mockResponse,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      addMessage(activeChatId, finalAssistantMessage);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Ошибка при отправке сообщения');
    } finally {
      finishStreaming();
    }
  }, [activeChatId, isLoading, addMessage, updateLastMessage, setLoading, setStreaming, updateStreamingContent, finishStreaming, setError]); 

  const handleStopGeneration = useCallback(() => {
    finishStreaming();
  }, [finishStreaming]);
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>{currentChat?.title || 'Чат'}</ChatTitle>
        <SettingsButton onClick={onOpenSettings} title="Настройки">
          ⚙️
        </SettingsButton>
      </ChatHeader>
      
      <ErrorBoundary>
        <MessageList 
          messages={messages} 
          isLoading={isLoading || isStreaming}
          streamingMessage={streamingContent}
        />        
      </ErrorBoundary>

      {/* Отображение ошибки под полем ввода */}
      {error && <ErrorMessage message={error} />}
      
      <InputArea 
        onSendMessage={handleSendMessage}
        onStopGeneration={handleStopGeneration}
        isLoading={isLoading || isStreaming}
      />
    </ChatContainer>
  );
};

export default ChatWindow;