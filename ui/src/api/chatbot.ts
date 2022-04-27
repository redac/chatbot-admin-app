import { ChatBot } from '../models';

export async function getAllChatBots(): Promise<ChatBot[]> {
  return fetch('http://localhost:3030/api/chatbots').then(
    (res) => res.json() as Promise<ChatBot[]>
  );
}

export async function createChatBot(name: string) {
  const payload = new URLSearchParams({
    name: name,
  });
  return fetch('http://localhost:3030/api/chatbots', {
    body: payload,
    method: 'POST',
  });
}
