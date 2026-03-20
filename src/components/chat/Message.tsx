import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const MessageContainer = styled.div<{ $role: 'user' | 'assistant' }>`
  display: flex;
  justify-content: ${props => props.$role === 'user' ? 'flex-end' : 'flex-start'};
  margin: 16px 0;
  position: relative;
`;

const MessageWrapper = styled.div<{ $role: 'user' | 'assistant' }>`
  max-width: 70%;
  min-width: 200px;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  color: var(--color-text-secondary);
  font-size: 12px;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: #19c37d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-size: 12px;
  color: white;
`;

const MessageContent = styled.div<{ $role: 'user' | 'assistant' }>`
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${props => 
    props.$role === 'user' ? 'var(--color-user-message)' : 'var(--color-assistant-message)'};
  color: ${props => props.$role === 'user' ? 'white' : 'var(--color-text-primary)'};
  line-height: 1.5;
  font-size: 14px;
  
  /* Стили для markdown */
  pre {
    background-color: ${props => props.$role === 'user' ? '#0a4d10' : '#2d2d2d'};
    padding: 8px;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Courier New', monospace;
    font-size: 12px;
  }
  
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${props => props.$copied ? '#19c37d' : 'var(--color-bg-secondary)'};
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  color: ${props => props.$copied ? 'white' : 'var(--color-text-primary)'};
  display: none;
  transition: all 0.2s;
  
  ${MessageContainer}:hover & {
    display: block;
  }
  
  &:hover {
    background: ${props => props.$copied ? '#19c37d' : 'var(--color-border)'};
  }
`;

const Message: React.FC<MessageProps> = ({ role, content, timestamp }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      
      // Через 2 секунды скрываем уведомление
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };
  
  return (
    <MessageContainer $role={role}>
      <MessageWrapper $role={role}>
        <MessageHeader>
          {role === 'assistant' && (
            <Avatar>G</Avatar>
          )}
          {role === 'user' ? 'Вы' : 'GigaChat'} • {timestamp}
        </MessageHeader>
        <MessageContent $role={role}>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </MessageContent>
      </MessageWrapper>
      
      {/* Кнопка копирования только для сообщений ассистента */}
      {role === 'assistant' && (
        <CopyButton $copied={copied} onClick={handleCopy}>
          {copied ? '✓ Скопировано' : '📋 Копировать'}
        </CopyButton>
      )}
    </MessageContainer>
  );
};

export default Message;