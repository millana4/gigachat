// src/store/chatStore.ts
import { create } from 'zustand';
import { Chat, Message, ChatState } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

// Расширяем состояние методами для изменения
interface ChatStore extends ChatState {
  // Методы для работы с чатами
  createNewChat: () => string;
  deleteChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, newTitle: string) => void;
  setActiveChat: (chatId: string) => void;
  
  // Методы для работы с сообщениями
  addMessage: (chatId: string, message: Message) => void;
  updateLastMessage: (chatId: string, content: string) => void;
  
  // Методы для управления состоянием загрузки
  setLoading: (isLoading: boolean) => void;
  setStreaming: (isStreaming: boolean) => void;
  updateStreamingContent: (content: string) => void;
  finishStreaming: () => void;
  
  // Метод для ошибок
  setError: (error: string | null) => void;
  
  // Инициализация (загрузка сохранённых чатов)
  init: () => void;
}

// Вспомогательная функция для создания пустого чата
const createEmptyChat = (): Chat => ({
  id: Date.now().toString(),
  title: 'Новый чат',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [],
});

// Вспомогательная функция для создания демо-чата (для первого запуска)
const createDemoChat = (): Chat => ({
  id: 'demo-1',
  title: 'Пример чата',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [
    {
      id: '1',
      role: 'user',
      content: 'Привет! Расскажи, что ты умеешь?',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Привет! Я GigaChat, нейросеть от Сбера. Я умею отвечать на вопросы, писать тексты, переводить, объяснять сложные вещи простым языком и многое другое!',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    },
  ],
});

// Создаём store
export const useChatStore = create<ChatStore>((set, get) => ({
  // Начальное состояние
  chats: [],
  activeChatId: null,
  isLoading: false,
  isStreaming: false,
  streamingContent: '',
  error: null,
  
  // Создать новый чат
  createNewChat: () => {
    const newChat = createEmptyChat();
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: newChat.id,
    }));
    return newChat.id;
  },
  
  // Удалить чат
  deleteChat: (chatId) => {
    set((state) => {
      const newChats = state.chats.filter(chat => chat.id !== chatId);
      let newActiveId = state.activeChatId;
      
      // Если удалили активный чат, выбираем первый из оставшихся
      if (state.activeChatId === chatId) {
        newActiveId = newChats.length > 0 ? newChats[0].id : null;
      }
      
      return {
        chats: newChats,
        activeChatId: newActiveId,
      };
    });
  },
  
  // Обновить название чата
  updateChatTitle: (chatId, newTitle) => {
    set((state) => ({
      chats: state.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, title: newTitle, updatedAt: new Date().toISOString() }
          : chat
      ),
    }));
  },
  
  // Установить активный чат
  setActiveChat: (chatId) => {
    console.log('Store setActiveChat called with:', chatId);
    set({ activeChatId: chatId });
  },
  
  // Добавить сообщение в чат
  addMessage: (chatId, message) => {
    set((state) => {
      const updatedChats = state.chats.map(chat => {
        if (chat.id === chatId) {
          // Если это первое сообщение пользователя и чат называется "Новый чат" - генерируем название
          let newTitle = chat.title;
          if (message.role === 'user' && chat.title === 'Новый чат') {
            newTitle = message.content.slice(0, 35) + (message.content.length > 35 ? '...' : '');
          }
          
          return {
            ...chat,
            title: newTitle,
            updatedAt: new Date().toISOString(),
            messages: [...chat.messages, message],
          };
        }
        return chat;
      });
      
      return { chats: updatedChats };
    });
  },
  
  // Обновить последнее сообщение (для потокового ответа)
  updateLastMessage: (chatId, content) => {
    set((state) => {
      const updatedChats = state.chats.map(chat => {
        if (chat.id === chatId && chat.messages.length > 0) {
          const lastMessage = chat.messages[chat.messages.length - 1];
          if (lastMessage.role === 'assistant') {
            const updatedMessages = [...chat.messages];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              content,
            };
            return {
              ...chat,
              updatedAt: new Date().toISOString(),
              messages: updatedMessages,
            };
          }
        }
        return chat;
      });
      
      return { chats: updatedChats };
    });
  },
  
  // Установить состояние загрузки
  setLoading: (isLoading) => set({ isLoading }),
  
  // Установить состояние стриминга
  setStreaming: (isStreaming) => set({ isStreaming }),
  
  // Обновить текущий текст потокового ответа
  updateStreamingContent: (content) => set({ streamingContent: content }),
  
  // Завершить стриминг
  finishStreaming: () => set({ 
    isLoading: false, 
    isStreaming: false, 
    streamingContent: '' 
  }),
  
  // Установить ошибку
  setError: (error) => set({ error }),
  
  // Инициализация (пока без localStorage, просто создаём демо-чат)
  init: () => {
    const savedData = loadFromStorage();
    if (savedData && savedData.chats.length > 0) {
        set({ chats: savedData.chats, activeChatId: savedData.activeChatId });
    } else {
        const demoChat = createDemoChat();
        set({ chats: [demoChat], activeChatId: demoChat.id });
    }
  },
}));