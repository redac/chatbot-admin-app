import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon, AdjustmentsIcon, TrashIcon, ChatAlt2Icon } from '@heroicons/react/outline'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ChatbotSettingProps {
  onChatClick?: () => void | undefined
  onUpdateClick?: () => void | undefined
  onDeleteClick?: () => void | undefined
  showChatButton: boolean | undefined
}

export default function ChatBotSetting(props: ChatbotSettingProps) {
  return (
    <Menu as='div' className='inline-block text-left '>
      <div>
        <Menu.Button>
          <DotsHorizontalIcon className='w-6 h-6 text-gray-500'></DotsHorizontalIcon>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-50 w-48 origin-top-right bg-white rounded-md shadow-lg right-[12rem] ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {props.showChatButton && <Menu.Item>
              {({ active }) => (
                <a
                  onClick={props.onChatClick}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'content-center inline-flex w-full px-4 py-2 ',
                  )}
                >
                  <ChatAlt2Icon className='w-5 h-5 mr-2' />
                  <span>Chat</span>
                </a>
              )}
            </Menu.Item>}
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={props.onUpdateClick}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'content-center inline-flex w-full px-4 py-2 ',
                  )}
                >
                  <AdjustmentsIcon className='w-5 h-5 mr-2' />
                  <span>Update</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  onClick={props.onDeleteClick}
                  className={classNames(
                    active ? 'bg-gray-100 text-red-600' : 'text-red-500',
                    'content-center inline-flex w-full px-4 py-2',
                  )}
                >
                  <TrashIcon className='w-5 h-5 mr-2' />
                  <span>Delete</span>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
