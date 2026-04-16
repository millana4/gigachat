import { useChatStore } from './chatStore';

describe('chatStore', () => {
  beforeEach(() => {
    useChatStore.setState({
      chats: [],
      activeChatId: null,
      isLoading: false,
      isStreaming: false,
      streamingContent: '',
      error: null,
    });
  });

  test('createNewChat создает новый чат', () => {
    const { createNewChat } = useChatStore.getState();
    const id = createNewChat();
    const chats = useChatStore.getState().chats;
    expect(chats.length).toBe(1);
    expect(chats[0].id).toBe(id);
  });

  test('deleteChat удаляет чат', () => {
    const { createNewChat, deleteChat, setActiveChat } = useChatStore.getState();
    const id = createNewChat();
    setActiveChat(id);
    deleteChat(id);
    expect(useChatStore.getState().chats.length).toBe(0);
    expect(useChatStore.getState().activeChatId).toBeNull();
  });

  test('updateChatTitle обновляет название чата', () => {
    const { createNewChat, updateChatTitle } = useChatStore.getState();
    const id = createNewChat();
    updateChatTitle(id, 'Новое название');
    const chat = useChatStore.getState().chats.find(c => c.id === id);
    expect(chat?.title).toBe('Новое название');
  });
});
