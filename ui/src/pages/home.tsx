import { useState } from 'react'
import { useQuery } from 'react-query'
import { getAllChatBots } from '../api/chatbot'
import { CreateChatbotModal, ChatbotList } from '../components/core'
import { PageLayout } from './_layout'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const { data, status } = useQuery('bots', getAllChatBots)
  return (
    <PageLayout title={'Chatbot Admin Panel'}>
      <div className='grid place-items-end'>
        <button
          onClick={() => setIsOpen(true)}
          className='inline-flex items-center justify-center px-4 py-3 mb-3 space-x-2 text-center text-white transition duration-200 ease-in-out bg-blue-500 rounded-lg text-m shadow-blue-500/50 hover:bg-blue-600 focus:outline-none'
        >
          <span>Create Chatbot</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </div>
      <ChatbotList list={data} />
      <CreateChatbotModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </PageLayout>
  )
}
