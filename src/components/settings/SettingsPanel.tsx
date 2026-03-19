import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: flex-end;
  z-index: 2000;
`;

const Drawer = styled.div`
  width: 400px;
  max-width: 100%;
  height: 100%;
  background-color: var(--color-bg-primary);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
`;

const DrawerTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 24px;
  cursor: pointer;
  
  &:hover {
    color: var(--color-text-primary);
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const SettingsSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [model, setModel] = useState('GigaChat');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [systemPrompt, setSystemPrompt] = useState('Ты полезный ассистент');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  // При загрузке проверяем сохраненную тему
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    if (savedTheme === 'light') {
      setIsDarkTheme(false);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  
  const handleThemeToggle = () => {
    console.log('Toggle clicked, current:', isDarkTheme);
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    
    if (newTheme) {
      console.log('Switching to dark theme');
      document.documentElement.setAttribute('data-theme', 'dark'); // для темной темы не ставим атрибут
      localStorage.setItem('theme', 'dark');
    } else {
      console.log('Switching to light theme');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const handleSave = () => {
    console.log('Save settings:', {
      model,
      temperature,
      topP,
      maxTokens,
      systemPrompt,
      isDarkTheme
    });
    onClose();
  };
  
  const handleReset = () => {
    setModel('GigaChat');
    setTemperature(0.7);
    setTopP(0.9);
    setMaxTokens(2048);
    setSystemPrompt('Ты полезный ассистент');
    
    // Сбрасываем тему на светлую
    setIsDarkTheme(false);
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  };
  
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Drawer onClick={e => e.stopPropagation()}>
        <DrawerHeader>
          <DrawerTitle>Настройки</DrawerTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </DrawerHeader>
        
        <DrawerContent>
          <SettingsSection>
            <SectionTitle>Модель</SectionTitle>
            <Select value={model} onChange={e => setModel(e.target.value)}>
              <option value="GigaChat">GigaChat</option>
              <option value="GigaChat-Plus">GigaChat-Plus</option>
              <option value="GigaChat-Pro">GigaChat-Pro</option>
              <option value="GigaChat-Max">GigaChat-Max</option>
            </Select>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>Параметры генерации</SectionTitle>
            <Slider
              min={0}
              max={2}
              step={0.1}
              value={temperature}
              onChange={setTemperature}
              label="Temperature"
            />
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={topP}
              onChange={setTopP}
              label="Top P"
            />
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>Max Tokens</SectionTitle>
            <NumberInput
              type="number"
              value={maxTokens}
              onChange={e => setMaxTokens(parseInt(e.target.value))}
              min={1}
              max={4096}
            />
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>System Prompt</SectionTitle>
            <TextArea
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              placeholder="Введите системный промпт..."
            />
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>Тема</SectionTitle>
            <Toggle
              isOn={isDarkTheme}
              onToggle={handleThemeToggle}
              label="Темная тема"
            />
          </SettingsSection>
          
          <ButtonsContainer>
            <Button variant="primary" onClick={handleSave}>Сохранить</Button>
            <Button variant="secondary" onClick={handleReset}>Сбросить</Button>
          </ButtonsContainer>
        </DrawerContent>
      </Drawer>
    </Overlay>
  );
};

export default SettingsPanel;