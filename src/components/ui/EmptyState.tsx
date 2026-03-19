import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  color: var(--color-text-secondary);
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--color-text-primary);
`;

const Text = styled.p`
  font-size: 14px;
  text-align: center;
  max-width: 300px;
`;

const EmptyState: React.FC = () => {
  return (
    <Container>
      <Icon>💬</Icon>
      <Title>Начните новый диалог</Title>
      <Text>Задайте вопрос или напишите сообщение, чтобы начать общение с GigaChat</Text>
    </Container>
  );
};

export default EmptyState;