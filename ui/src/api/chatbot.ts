import { Chatbot } from '../models'

export async function getAllBrains(): Promise<string[]> {
  return fetch('http://localhost:3030/api/brains').then((res) => res.json() as Promise<string[]>)
}

export async function getAllChatBots(): Promise<Chatbot[]> {
  return fetch('http://localhost:3030/api/chatbots').then((res) => res.json() as Promise<Chatbot[]>)
}

export async function getAllInterfaces(): Promise<string[]> {
  return fetch('http://localhost:3030/api/interfaces').then(
    (res) => res.json() as Promise<string[]>,
  )
}

export async function createChatBot(name: string) {
  const payload = new URLSearchParams({
    name: name,
  })
  return fetch('http://localhost:3030/api/chatbots', {
    body: payload,
    method: 'POST',
  })
}
