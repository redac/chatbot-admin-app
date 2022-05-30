import { Chatbot } from '../../models'
import { Card } from '../shared'
import ChatBotSetting from './ChatbotSetting'

export interface ChatbotListProps {
  list?: Chatbot[] | undefined
}

function ChatbotList(props: ChatbotListProps) {
  if (!props.list)
    return (
      <>
        <Card>
        <p>No Chatbot was found! Try creating a new one 🤖</p>
        </Card>
      </>
    )

  const items = props.list.filter((item) => item != null)
  return (
    <>
      <div className='my-2 overflow-auto bg-white rounded-lg shadow max-h-[50vh]'>
        <div className='bg-white rounded-xl'>
          <table className='w-full table-auto'>
            <thead className='rounded-md bg-gray-50'>
              <tr className='sticky top-0 text-left rounded-md bg-gray-50 font-display'>
                <th className='p-4 font-normal text-gray-500 rounded-lg'>ID</th>
                <th className='p-4 font-normal text-gray-500 rounded-lg'>Name</th>
                <th className='p-4 font-normal text-gray-500 rounded-lg'>Brain</th>
                <th className='p-4 font-normal text-gray-500 rounded-lg'>URL</th>
                <th className='p-4 font-normal text-gray-500 rounded-lg'>Web</th>
                <th className='p-4 font-normal text-gray-500 rounded-lg'>Discord</th>
                <th className='p-4 font-normal text-gray-500 rounded-lg '></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr className='p-2 text-left border-t rounded-md'>
                    <td className='p-4 text-gray-500/50'>{item.bot_id}</td>
                    <td className='p-4'>{item.name}</td>
                    <td className='p-4'>{item.brain}</td>
                    <td className='p-4 text-gray-500/50'><a href={item.url}>{item.url}</a></td>
                    <td className='p-4'>
                      <ChatbotIntegrationStatus status={item.web === true} />
                    </td>
                    <td className='p-4'>
                      <ChatbotIntegrationStatus status={item.discord === true} />
                    </td>
                    <td className='p-4'>
                      <ChatBotSetting />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function ChatbotIntegrationStatus({ status }: { status: boolean }) {
  if (status) {
    return <div className='px-4 py-1 text-sm text-blue-500 bg-blue-100 rounded-full w-fit'>On</div>
  } else {
    return <div className='px-4 py-1 text-sm text-gray-500 bg-gray-100 rounded-full w-fit'>Off</div>
  }
}

export default ChatbotList
