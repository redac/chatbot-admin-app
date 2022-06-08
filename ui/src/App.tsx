import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Home from './pages/home'
import NotFound from './pages/notFound'
import Playground from './pages/playground'
import Update from './pages/update'
const queryClient = new QueryClient()

function App() {
  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '1.15rem'
          },
        }}
        reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnimatePresence>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='update' element={<Update />} />
              <Route path='playground' element={<Playground />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
