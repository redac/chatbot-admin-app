// import { Text } from "@nextui-org/react";

import { Card } from '../components/shared'
import { PageLayout } from './_layout'

const messages: MessageProps[] = [
  {
    from: 'self',
    content: 'Hi',
  },
  {
    from: 'bot',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit, amet consectetur adipisicing elit ',
  },
  {
    from: 'self',
    content: 'How are you doing today ?',
  },
  {
    from: 'bot',
    content: 'Im doing alright thanks for asking',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
  {
    from: 'self',
    content: 'Thank you Steve',
  },
]

function Playground() {
  return (
    <PageLayout title='Playground'>
      <Card>
        <MessageList messages={messages} />

        <div className='flex'>
          <input
            type='text'
            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md'
            onChange={() => console.log()}
          />
          <button className='inline-flex justify-center w-full px-6 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm shadow-blue-500/50 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto'>
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
            props.from == 'self' ? 'bg-white mr-2' : 'bg-indigo-600 text-white ml-2'
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
  return (
    <>
      <div className='rounded-md bg-gray-50 mb-4 p-4 space-y-4 grid grid-cols-1 overflow-y-auto max-h-[60rem] shadow-sm'>
        {props.messages.map((item) => {
          return <Message content={item.content} from={item.from} />
        })}
      </div>
    </>
  )
}

export default Playground
