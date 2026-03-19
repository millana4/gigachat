import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 14px;
  
  background-color: ${props => 
    props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  
  &:hover {
    background-color: ${props => 
      props.variant === 'primary' ? '#0056b3' : '#5a6268'};
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  type = 'button'
}) => {
  return (
    <StyledButton 
      variant={variant} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;