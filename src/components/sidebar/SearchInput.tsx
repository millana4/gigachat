import React from 'react';
import styled from 'styled-components';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  box-sizing: border-box;
  
  &::placeholder {
    color: var(--color-text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <Input 
        type="text" 
        placeholder="🔍 Поиск по чатам..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchInput;