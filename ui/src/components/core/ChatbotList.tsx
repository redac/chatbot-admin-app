import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteChatbot } from '../../api/chatbot'
import { Chatbot } from '../../models'
import { Card } from '../shared'
import ChatBotSetting from './ChatbotSetting'

export interface ChatbotListProps {
  list?: Chatbot[] | undefined
}

function ChatbotList(props: ChatbotListProps) {
  if (!props.list || props.list.length === 0)
    return (
      <>
        <Card>
          <p>No Chatbot was found! Try creating a new one 🤖</p>
        </Card>
      </>
    )
  const navigate = useNavigate()
  const client = useQueryClient()
  const deleteChatbotMutation = useMutation((id: number) => deleteChatbot(id))

  const items = props.list.filter((item) => item != null)
  return (
    <>
      <div className='my-2 overflow-y-auto bg-white rounded-lg shadow'>
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
                  <tr className='p-2 text-left border-t rounded-md' key={item.bot_id}>
                    <td className='p-4 text-gray-500/50'>{item.bot_id}</td>
                    <td className='p-4'>{item.name}</td>
                    <td className='p-4'>{item.brain}</td>
                    <td className='p-4 text-gray-500/50'>
                      <a href={item.url}>{item.url}</a>
                    </td>
                    <td className='p-4'>
                      <ChatbotIntegrationStatus status={item.web === true} />
                    </td>
                    <td className='p-4'>
                      <ChatbotIntegrationStatus status={item.discord === true} />
                    </td>
                    <td className='p-4'>
                      <ChatBotSetting
                        onChatClick={() => navigate('/playground', { state: item })}
                        onUpdateClick={() => navigate('/update', { state: item })}
                        onDeleteClick={() =>
                          deleteChatbotMutation.mutate(item.bot_id, {
                            onSuccess: () => client.invalidateQueries('bots'),
                          })
                        }
                      />
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
    return <div className='px-4 py-1 text-sm text-red-500 bg-red-100 rounded-full w-fit'>Off</div>
  }
}

export default ChatbotList
