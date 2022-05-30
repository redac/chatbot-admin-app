import { useState } from 'react'
import { Input, Select, Toggle } from '../components/forms'
import { Chatbot } from '../models'
import { PageLayout } from './_layout'

interface UpdateProps {
  chatbot?: Chatbot | undefined
}

function Update(props: UpdateProps) {
  const [webEnabled, setWebEnabled] = useState(false)
  const [discordEnabled, setDiscordEnabled] = useState(false)
  const chatbotName = 'Steve (23)' // TODO: fill with actual data
  return (
    <PageLayout title={`Update Chatbot : ${chatbotName}`}>
      <div className='w-full p-6 bg-white border shadow rounded-2xl'>
        <Input label={'Name'} />
        <Input label={'Brain'} />
        <Toggle
          label={'Web'}
          enabled={webEnabled}
          setEnabled={setWebEnabled}
          expandedArea={<h1>Web</h1>}
        />
        <Toggle
          label={'Discord'}
          enabled={discordEnabled}
          setEnabled={setDiscordEnabled}
          expandedArea={<h1>Discord</h1>}
        />
        <Select
          name='brains-option'
          id='brains-options'
          label='Select Brain'
          options={[
            { value: '1', label: 'Durward Reynolds' },
            { value: '1', label: 'Kenton Towne' },
            { value: '1', label: 'Therese Wunsch' },
            { value: '1', label: 'Benedict Kessler' },
            { value: '1', label: 'Katelyn Rohan' },
          ]}
        />
      </div>
      <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <button
          type='button'
          className='inline-flex justify-center w-full px-12 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto'
        >
          Save
        </button>
        <button
          type='button'
          className='inline-flex justify-center w-full px-12 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto'
        >
          Cancel
        </button>
      </div>
    </PageLayout>
  )
}

export default Update
