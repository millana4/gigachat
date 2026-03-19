import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-bg-primary);
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

interface AuthFormProps {
  onLogin?: (credentials: { auth: string; scope: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState('');
  const [scope, setScope] = useState('GIGACHAT_API_PERS');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.trim()) {
      setError('Поле Credentials не может быть пустым');
      return;
    }
    
    setError('');
    onLogin?.({ auth: credentials, scope });
    console.log('Login with:', { credentials, scope });
  };
  
  return (
    <AuthContainer>
      <AuthCard>
        <Title>Вход в GigaChat</Title>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Credentials (Base64)</Label>
            <Input
              type="password"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              placeholder="Введите Base64 строку"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Scope</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  value="GIGACHAT_API_PERS"
                  checked={scope === 'GIGACHAT_API_PERS'}
                  onChange={(e) => setScope(e.target.value)}
                />
                GIGACHAT_API_PERS
              </RadioLabel>
              
              <RadioLabel>
                <RadioInput
                  type="radio"
                  value="GIGACHAT_API_B2B"
                  checked={scope === 'GIGACHAT_API_B2B'}
                  onChange={(e) => setScope(e.target.value)}
                />
                GIGACHAT_API_B2B
              </RadioLabel>
              
              <RadioLabel>
                <RadioInput
                  type="radio"
                  value="GIGACHAT_API_CORP"
                  checked={scope === 'GIGACHAT_API_CORP'}
                  onChange={(e) => setScope(e.target.value)}
                />
                GIGACHAT_API_CORP
              </RadioLabel>
            </RadioGroup>
          </FormGroup>
          
          {error && <ErrorMessage message={error} />}
          
          <Button type="submit" variant="primary">Войти</Button>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthForm;