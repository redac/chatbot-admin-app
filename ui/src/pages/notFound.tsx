import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { PageLayout } from './_layout'

export default function NotFound() {
    return (
        <PageLayout title={'Home'}>
            <div className='flex flex-col items-center justify-center h-[50vh] text-gray-900/25'>
                <QuestionMarkCircleIcon className='h-20'></QuestionMarkCircleIcon>
                <span className='m-5 text-6xl font-black'>404 : Page Not Found</span>
            </div>
        </PageLayout>
    )
}
