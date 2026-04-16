export const mockResponses = [
  "Это моковый ответ вместо GigaChat.",
  "Это тестовый ответ.",
  "Ваше сообщение получено.",
  "Это автоматический ответ.",
  "Это моковый ответ вместо реального API.",
  "Благодарю за сообщение."
];

export const getRandomMockResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[randomIndex];
};

export {};