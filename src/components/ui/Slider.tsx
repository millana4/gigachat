import React from 'react';
import styled from 'styled-components';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-primary);
  font-size: 14px;
`;

const SliderLabel = styled.span``;

const SliderValue = styled.span`
  color: var(--color-text-secondary);
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  appearance: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Slider: React.FC<SliderProps> = ({ 
  min, 
  max, 
  step = 0.1, 
  value, 
  onChange, 
  label 
}) => {
  return (
    <SliderContainer>
      {label && (
        <SliderHeader>
          <SliderLabel>{label}</SliderLabel>
          <SliderValue>{value.toFixed(1)}</SliderValue>
        </SliderHeader>
      )}
      <StyledSlider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </SliderContainer>
  );
};

export default Slider;