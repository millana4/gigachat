import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import { useChatStore } from '../../store/chatStore';

jest.mock('../../store/chatStore', () => ({
  useChatStore: jest.fn(),
}));

const mockChats = [
  { id: '1', title: 'Работа', createdAt: '2024-01-01', updatedAt: '2024-01-01', messages: [] },
  { id: '2', title: 'Учеба', createdAt: '2024-01-01', updatedAt: '2024-01-01', messages: [] },
  { id: '3', title: 'Личное', createdAt: '2024-01-01', updatedAt: '2024-01-01', messages: [] },
];

describe('Sidebar', () => {
  const mockDeleteChat = jest.fn();
  const mockSetActiveChat = jest.fn();

  beforeEach(() => {
    (useChatStore as unknown as jest.Mock).mockReturnValue({
      chats: mockChats,
      createNewChat: jest.fn(),
      setActiveChat: mockSetActiveChat,
      updateChatTitle: jest.fn(),
      deleteChat: mockDeleteChat,
    });
  });

  test('отображаются все чаты при пустом поиске', () => {
    render(<Sidebar activeChatId="1" />);
    expect(screen.getByText('Работа')).toBeInTheDocument();
    expect(screen.getByText('Учеба')).toBeInTheDocument();
    expect(screen.getByText('Личное')).toBeInTheDocument();
  });

  test('фильтрация чатов по названию', () => {
    render(<Sidebar activeChatId="1" />);
    const searchInput = screen.getByPlaceholderText('🔍 Поиск по чатам...');
    fireEvent.change(searchInput, { target: { value: 'Работа' } });
    
    expect(screen.getByText('Работа')).toBeInTheDocument();
    expect(screen.queryByText('Учеба')).not.toBeInTheDocument();
    expect(screen.queryByText('Личное')).not.toBeInTheDocument();
  });

  test('при нажатии на кнопку удаления появляется модальное окно', () => {
    render(<Sidebar activeChatId="1" />);
    const deleteButtons = screen.getAllByTitle('Удалить');
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.getByText('Удалить чат?')).toBeInTheDocument();
    expect(screen.getByText('Вы уверены, что хотите удалить этот чат? Это действие нельзя отменить.')).toBeInTheDocument();
  });
});
