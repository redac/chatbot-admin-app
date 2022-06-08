import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { useMutation, useQueryClient } from 'react-query'
import { createChatBot } from '../../api/chatbot'
import { toast } from 'react-hot-toast';

interface CreateChatbotModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function CreateChatbotModal(props: CreateChatbotModalProps) {
  const cancelButtonRef = useRef(null)
  const [botName, setBotName] = useState('')

  const mutation = useMutation((name: string) => createChatBot(name))
  const client = useQueryClient()
  const onSave = () => {
    props.setIsOpen(false)
    mutation.mutate(botName, { onSuccess: () => client.invalidateQueries('bots') })
    if (botName.length == 0) toast.success('Chatbot created!');
    else toast.success('Chatbot "' + (botName || null) + '" created!');
  }

  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={props.setIsOpen}
      >
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='w-full p-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900 font-display'
                    >
                      Create new chatbot
                    </Dialog.Title>
                    <div className='w-full mt-2'>
                      <div className='col-span-6 sm:col-span-4'>
                        <input
                          type='text'
                          name='bot-name'
                          id='bot-name'
                          placeholder='Name'
                          onChange={(e) => setBotName(e.target.value)}
                          className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm shadow-blue-500/50 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto'
                  onClick={onSave}
                >
                  Create
                </button>
                <button
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto'
                  onClick={() => props.setIsOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
