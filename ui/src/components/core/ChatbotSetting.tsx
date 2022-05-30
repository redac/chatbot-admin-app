/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon, AdjustmentsIcon, TrashIcon } from '@heroicons/react/outline'

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ChatBotSetting() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
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
        <Menu.Items className='absolute right-0 z-20 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='/update'
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
                  className={classNames(
                    active ? 'bg-gray-100 text-red-800' : 'text-red-500',
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
