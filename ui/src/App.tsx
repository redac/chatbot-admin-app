import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Playground from './pages/playground'
import Update from './pages/update'

const queryClient = new QueryClient()

function App() {
  return (
    <div className='h-screen p-4 bg-gray-100'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='update' element={<Update />} />
            <Route path='playground' element={<Playground />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </div>
  )
}

export default App
