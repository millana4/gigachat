import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputArea from './InputArea';

describe('InputArea', () => {
  test('кнопка отправки заблокирована при пустом поле', () => {
    render(<InputArea onSendMessage={() => {}} isLoading={false} />);
    const button = screen.getByTitle('Отправить');
    expect(button).toBeDisabled();
  });

  test('кнопка отправки активна при непустом поле', () => {
    render(<InputArea onSendMessage={() => {}} isLoading={false} />);
    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    fireEvent.change(textarea, { target: { value: 'текст' } });
    const button = screen.getByTitle('Отправить');
    expect(button).not.toBeDisabled();
  });

  test('при клике на кнопку вызывается onSendMessage', () => {
    const mockSend = jest.fn();
    render(<InputArea onSendMessage={mockSend} isLoading={false} />);
    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    fireEvent.change(textarea, { target: { value: 'привет' } });
    const button = screen.getByTitle('Отправить');
    fireEvent.click(button);
    expect(mockSend).toHaveBeenCalledWith('привет');
  });
});
