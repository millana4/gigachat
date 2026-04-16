import { saveToStorage, loadFromStorage, clearStorage } from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('сохраняет данные в localStorage', () => {
    const data = { chats: [], activeChatId: null };
    saveToStorage(data);
    const saved = localStorage.getItem('gigachat_app');
    expect(saved).not.toBeNull();
  });

  test('загружает данные из localStorage', () => {
    const data = { chats: [], activeChatId: null };
    localStorage.setItem('gigachat_app', JSON.stringify(data));
    const loaded = loadFromStorage();
    expect(loaded).toEqual(data);
  });

  test('при битых данных возвращает null', () => {
    localStorage.setItem('gigachat_app', 'невалидный json');
    const loaded = loadFromStorage();
    expect(loaded).toBeNull();
  });

  test('очищает localStorage', () => {
    localStorage.setItem('gigachat_app', 'test');
    clearStorage();
    expect(localStorage.getItem('gigachat_app')).toBeNull();
  });
});
