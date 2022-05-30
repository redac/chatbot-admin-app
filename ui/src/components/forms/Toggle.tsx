import { Switch } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
interface ToggleProps {
  label: string
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  expandedArea?: JSX.Element[] | JSX.Element
}

export default function Toggle(props: ToggleProps) {
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  return (
    <div>
      <div className='grid grid-cols-6 items-center w-3/4 my-2'>
        <span className='text-md text-gray-700 font-medium'>{props.label}</span>
        <Switch
          checked={props.enabled}
          onChange={props.setEnabled}
          className={`${
            props.enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className='sr-only'>Enable notifications</span>
          <span
            className={`${
              props.enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>
      </div>

      <AnimatePresence>
        {props.enabled && props.expandedArea && (
          <motion.div
            className='bg-gray-200 p-4 rounded-2xl w-1/2 my-2'
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ ease: 'linear', duration: 0.5 }}
          >
            {props.expandedArea}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
