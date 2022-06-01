import { Chatbot } from '../models'


export const baseUrl = 'http://localhost:3030/api'

export async function getAllBrains(): Promise<string[]> {
  return fetch(`${baseUrl}/brains`).then((res) => res.json() as Promise<string[]>)
}

export async function getAllChatBots(): Promise<Chatbot[]> {
  return fetch(`${baseUrl}/chatbots`).then((res) => res.json() as Promise<Chatbot[]>)
}

export async function getAllInterfaces(): Promise<string[]> {
  return fetch(`${baseUrl}/interfaces`).then((res) => res.json() as Promise<string[]>)
}

export async function createChatBot(name: string) {
  const payload = new URLSearchParams({
    name: name,
  })
  return fetch(`${baseUrl}/chatbots`, {
    body: payload,
    method: 'POST',
  })
}

export async function updateBot(bot: Chatbot) {
  const newBot = {
    name: bot.name,
    brain: bot.brain,
    web: bot.web,
    discord: bot.discord,
  }
  return fetch(`${baseUrl}/chatbots/${bot.bot_id}`, {
    body: JSON.stringify(newBot),
    headers: { 'Content-type': 'application/json' },
    method: 'PATCH',
  })
}

export async function deleteChatbot(id: number) {
  return fetch(`${baseUrl}/chatbots/${id}`, {
    method: 'DELETE',
  })
}
