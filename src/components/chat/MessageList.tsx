import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import EmptyState from '../ui/EmptyState';

interface MessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-bg-primary);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
  }
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
`;

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  if (messages.length === 0) {
    return (
      <ListContainer>
        <EmptyState />
      </ListContainer>
    );
  }
  
  return (
    <ListContainer>
      <MessagesWrapper>
        {messages.map(message => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && <TypingIndicator isVisible={true} />}
        
        <div ref={messagesEndRef} />
      </MessagesWrapper>
    </ListContainer>
  );
};

export default MessageList;