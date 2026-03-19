import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  
  &::placeholder {
    color: var(--color-text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchInput: React.FC = () => {
  return (
    <SearchContainer>
      <Input 
        type="text" 
        placeholder="Поиск по чатам..." 
      />
    </SearchContainer>
  );
};

export default SearchInput;