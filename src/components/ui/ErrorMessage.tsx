import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
  message: string;
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  color: #721c24;
  margin: 8px 0;
`;

const Icon = styled.span`
  font-size: 18px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <Icon>⚠️</Icon>
      <Text>{message}</Text>
    </ErrorContainer>
  );
};

export default ErrorMessage;