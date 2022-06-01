import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
export interface PageLayoutProps {
  children: JSX.Element | JSX.Element[]
  title: string | JSX.Element
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

export function PageLayout(props: PageLayoutProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <motion.div initial='initial' animate='in' exit='out' variants={pageVariants}>
      <div className='container mx-auto'>
        <div className='flex flex-row items-center h-20 my-12'>
          {pathname !== '/' && (
            <button onClick={() => navigate(-1)}>
              <ArrowLeftIcon className='w-14 h-14 mr-8 text-slate-900 font-display'></ArrowLeftIcon>
            </button>
          )}
          {typeof props.title === 'string' ? (
            <h1 className='text-6xl font-black align-middle text-slate-900 font-display'>
              {props.title}
            </h1>
          ) : (
            props.title
          )}
        </div>
        {props.children}
      </div>
    </motion.div>
  )
}
