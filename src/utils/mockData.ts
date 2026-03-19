export interface Chat {
  id: string;
  title: string;
  lastMessageDate: string;
  isActive: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const mockChats: Chat[] = [
  { id: '1', title: 'Обсуждение проекта', lastMessageDate: '2024-03-19', isActive: true },
  { id: '2', title: 'Помощь с кодом', lastMessageDate: '2024-03-18', isActive: false },
  { id: '3', title: 'Идеи для стартапа', lastMessageDate: '2024-03-17', isActive: false },
  { id: '4', title: 'Учебные вопросы', lastMessageDate: '2024-03-16', isActive: false },
  { id: '5', title: 'Личные заметки', lastMessageDate: '2024-03-15', isActive: false },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Привет! Расскажи про React',
    timestamp: '10:00',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'React - это библиотека для создания пользовательских интерфейсов. Вот пример кода:\n\n```jsx\nfunction Component() {\n  return <div>Hello</div>;\n}\n```\n\n**Основные особенности:**\n- Компонентный подход\n- Виртуальный DOM\n- JSX синтаксис',
    timestamp: '10:01',
  },
  {
    id: '3',
    role: 'user',
    content: 'А что такое хуки?',
    timestamp: '10:02',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Хуки - это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах. Например, `useState`, `useEffect`, `useContext`.',
    timestamp: '10:03',
  },
  {
    id: '5',
    role: 'user',
    content: 'Покажи пример useState',
    timestamp: '10:04',
  },
  {
    id: '6',
    role: 'assistant',
    content: '```jsx\nimport { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Вы нажали {count} раз</p>\n      <button onClick={() => setCount(count + 1)}>\n        Нажми меня\n      </button>\n    </div>\n  );\n}\n```',
    timestamp: '10:05',
  },
];
