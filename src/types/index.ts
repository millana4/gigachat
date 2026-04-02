// src/types/index.ts

// Тип для одного сообщения
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Тип для чата
export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

// Тип для состояния (что храним в store)
export interface ChatState {
  chats: Chat[];           // список всех чатов
  activeChatId: string | null;  // ID активного чата
  isLoading: boolean;      // идёт загрузка?
  isStreaming: boolean;    // идёт потоковый ответ?
  streamingContent: string; // текущий текст потокового ответа
  error: string | null;    // ошибка, если есть
}

// Тип для действий (как можно изменить состояние)
export type ChatAction = 
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'UPDATE_CHAT'; payload: Chat }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'SET_ACTIVE_CHAT'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'UPDATE_LAST_MESSAGE'; payload: { chatId: string; content: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STREAMING'; payload: boolean }
  | { type: 'UPDATE_STREAMING_CONTENT'; payload: string }
  | { type: 'FINISH_STREAMING' }
  | { type: 'SET_ERROR'; payload: string | null };