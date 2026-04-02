import { Chat } from '../types';

const STORAGE_KEY = 'gigachat_app';

interface StorageData {
  chats: Chat[];
  activeChatId: string | null;
}

export const saveToStorage = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Saved to localStorage:', data);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromStorage = (): StorageData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      console.log('No data in localStorage');
      return null;
    }
    const parsed = JSON.parse(raw) as StorageData;
    console.log('Loaded from localStorage:', parsed);
    return parsed;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Cleared localStorage');
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};