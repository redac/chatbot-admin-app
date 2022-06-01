import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Playground from './pages/playground'
import Update from './pages/update'
import { AnimatePresence } from 'framer-motion'
const queryClient = new QueryClient()

function App() {
  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AnimatePresence>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='update' element={<Update />} />
              <Route path='playground' element={<Playground />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </div>
  )
}

export default App
