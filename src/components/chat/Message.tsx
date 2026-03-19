import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const MessageContainer = styled.div<{ role: 'user' | 'assistant' }>`
  display: flex;
  justify-content: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  margin: 16px 0;
  position: relative;
`;

const MessageWrapper = styled.div<{ role: 'user' | 'assistant' }>`
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

const MessageContent = styled.div<{ role: 'user' | 'assistant' }>`
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${props => 
    props.role === 'user' ? 'var(--color-user-message)' : 'var(--color-assistant-message)'};
  color: ${props => props.role === 'user' ? 'white' : 'var(--color-text-primary)'};
  line-height: 1.5;
  font-size: 14px;
  
  /* Стили для markdown */
  pre {
    background-color: ${props => props.role === 'user' ? '#0a4d10' : '#2d2d2d'};
    padding: 8px;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Courier New', monospace;
    font-size: 12px;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  color: var(--color-text-primary);
  display: none;
  
  ${MessageContainer}:hover & {
    display: block;
  }
  
  &:hover {
    background: var(--color-border);
  }
`;

const Message: React.FC<MessageProps> = ({ role, content, timestamp }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <MessageContainer role={role}>
      <MessageWrapper role={role}>
        <MessageHeader>
          {role === 'assistant' && (
            <Avatar>G</Avatar>
          )}
          {role === 'user' ? 'Вы' : 'GigaChat'} • {timestamp}
        </MessageHeader>
        <MessageContent role={role}>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </MessageContent>
      </MessageWrapper>
      
      <CopyButton onClick={handleCopy}>
        {copied ? '✓' : '📋'}
      </CopyButton>
    </MessageContainer>
  );
};

export default Message;
