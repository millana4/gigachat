import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useParams, useNavigate, Navigate } from 'react-router-dom';
import App from '../../App';
import { useChatStore } from '../../store/chatStore';

// Компонент для страницы чата
const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setActiveChat, activeChatId, chats, init } = useChatStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    init();
  }, [init]);
  
  useEffect(() => {
    if (id && id !== activeChatId) {
      const chatExists = chats.some(chat => chat.id === id);
      if (chatExists) {
        setActiveChat(id);
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [id, activeChatId, chats, setActiveChat, navigate]);
  
  return <App />;
};

// Компонент для главной страницы
const MainPage: React.FC = () => {
  const { activeChatId, chats, init } = useChatStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    init();
  }, [init]);
  
  useEffect(() => {
    if (activeChatId && chats.length > 0) {
      navigate(`/chat/${activeChatId}`, { replace: true });
    }
  }, [activeChatId, chats, navigate]);
  
  return <App />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/chat/:id',
    element: <ChatPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};