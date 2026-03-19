import React from 'react';
import styled, { keyframes } from 'styled-components';

interface TypingIndicatorProps {
  isVisible: boolean;
}

const pulse = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  padding: 20px 0;
  margin-left: 40px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: var(--color-text-secondary);
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  return (
    <Container isVisible={isVisible}>
      <Dot />
      <Dot />
      <Dot />
    </Container>
  );
};

export default TypingIndicator;