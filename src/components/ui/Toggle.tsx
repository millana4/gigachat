import React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleLabel = styled.span`
  color: var(--color-text-primary);
  font-size: 14px;
`;

const ToggleSwitch = styled.button<{ isOn: boolean }>`
  width: 48px;
  height: 24px;
  background-color: ${props => props.isOn ? '#007bff' : 'var(--color-border)'};
  border: none;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.isOn ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, label }) => {
  console.log('Toggle rendered:', { isOn, label }); // Добавим для отладки
  
  return (
    <ToggleContainer>
      {label && <ToggleLabel>{label}</ToggleLabel>}
      <ToggleSwitch isOn={isOn} onClick={onToggle} />
    </ToggleContainer>
  );
};

export default Toggle;