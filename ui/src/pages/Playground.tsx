import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card } from '../components/shared'
import { Chatbot } from '../models'
import { PageLayout } from './_layout'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function Playground() {
  const { state } = useLocation()
  const navigate = useNavigate()
  if (!state) {
    navigate('/')
  }
  const [bot, setBot] = useState(state as Chatbot)
  const [message, setMessage] = useState('')
  const [messageList, setmessageList] = useState([] as MessageProps[])

  const onMessageSend = async (event: React.FormEvent) => {
    // TODO add try catch and show a toast when something bad happens : https://react-hot-toast.com/
    event.preventDefault()
    console.log(message)
    // Fetch
    const res = await (
      await fetch(bot.url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message }),
        method: 'POST',
      })
    ).json()
    setmessageList([
      ...messageList,
      {
        from: 'self',
        content: message,
      },
      {
        from: 'bot',
        content: res.message,
      },
    ])
    setMessage('')
  }

  return (
    <PageLayout title={`Playground : (Chatbot ${bot.bot_id} - ${bot.name} )`}>
      <Card>
        <MessageList messages={messageList} />
        <form onSubmit={onMessageSend}>
          <div className='flex'>
            <input
              type='text'
              placeholder='Message'
              value={message}
              className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type='submit'
              className='inline-flex justify-center w-full px-6 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm shadow-blue-500/50 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto'
            >
              <svg
                className='w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  d='M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37zm4.89-.2l5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17z'
                  fill='rgba(255,255,255,1)'
                />
              </svg>
            </button>
          </div>
        </form>
      </Card>
    </PageLayout>
  )
}

interface MessageProps {
  content: string
  from: 'self' | 'bot'
}

function Message(props: MessageProps) {
  return (
    <>
      <div className={`${props.from == 'self' ? 'place-self-end' : 'place-self-start'}`}>
        <div
          className={`'max-w-xs px-4 py-4 mb-2 rounded-xl shadow-lg' ${
            props.from == 'self' ? 'bg-blue-500 text-white mr-2' : 'bg-gray-200 ml-2'
          }`}
        >
          <span>{props.content}</span>
        </div>
      </div>
    </>
  )
}

interface MessageListProps {
  messages: MessageProps[]
}

function MessageList(props: MessageListProps) {
  const [animationParent] = useAutoAnimate()
  if (!props.messages || props.messages.length === 0)
    return (
      <>
        <div className='rounded-md mb-4 p-4 space-y-4 grid grid-cols-1 overflow-y-auto scrollbar max-h-[60rem] min-h-full h-[50vh]' ref={animationParent as React.RefObject<HTMLDivElement>}>
        <p className='m-10 text-center text-gray-400'>Try saying hi !</p>
        </div>
      </>
    )
  return (
    <>
      <div className='rounded-md mb-4 p-4 space-y-4 grid grid-cols-1 overflow-y-auto scrollbar max-h-[60rem] min-h-full h-[50vh]' ref={animationParent as React.RefObject<HTMLDivElement>}>
        {props.messages.map((item, index) => {
          return <Message key={index} content={item.content} from={item.from} />
        })}
      </div>
    </>
  )
}

export default Playground
