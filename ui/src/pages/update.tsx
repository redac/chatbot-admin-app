import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllBrains, updateBot } from '../api/chatbot'
import { Input, Select, Toggle } from '../components/forms'
import { Chatbot } from '../models'
import { PageLayout } from './_layout'

interface UpdateProps {
  chatbot?: Chatbot | undefined
}

function Update(props: UpdateProps) {
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true })
    }
  })
  const client = useQueryClient()
  const updateMutation = useMutation((oldBot: Chatbot) => updateBot(oldBot), {
    onSuccess: () => client.invalidateQueries('bots'),
  })
  const [bot, setBot] = useState(state as Chatbot)

  const { data: brains } = useQuery('brains', getAllBrains)

  const onSave = () => {
    updateMutation.mutate(bot)
    navigate(-1)
    toast.success('Chatbot "' + bot.name + '" updated!')
  }

  return (
    <>
      {state && (
        <PageLayout title={`Update: (Chatbot ${bot.bot_id} - ${bot.name} )`}>
          <div className='w-full p-6 bg-white border shadow rounded-2xl'>
            <Input
              label={'Name'}
              value={bot.name}
              onChange={(e) => setBot({ ...bot, name: e.target.value })}
            />
            <Select
              name='brains-option'
              id='brains-options'
              label='Select Brain'
              options={brains}
              value={bot.brain}
              onChange={(e) => setBot({ ...bot, brain: e.target.value })}
            />
            <Toggle
              label={'Web'}
              enabled={bot.web}
              setEnabled={(enabled) => setBot({ ...bot, web: enabled })}
            />
            <Toggle
              label={'Discord'}
              enabled={bot.discord}
              setEnabled={(enabled) => setBot({ ...bot, discord: enabled })}
            />
          </div>
          <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              onClick={onSave}
              type='button'
              className='inline-flex justify-center w-full px-12 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto'
            >
              Save
            </button>
            <button
              onClick={() => navigate(-1)}
              type='button'
              className='inline-flex justify-center w-full px-12 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto'
            >
              Cancel
            </button>
          </div>
        </PageLayout>
      )}
    </>
  )
}

export default Update
