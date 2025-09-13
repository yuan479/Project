import './App.css'
import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'

const Home = lazy(() => import('@/pages/Home'))
const AskAI = lazy(() => import('@/pages/AskAI'))
const BookShelf = lazy(() => import('@/pages/BookShelf'))
const My = lazy(() => import('@/pages/My'))
const Search = lazy(() => import('@/pages/Search'))

function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/askai' element={<AskAI />} />
            <Route path='/bookshelf' element={<BookShelf />} />
            <Route path='/my' element={<My />} />
          </Route>
          <Route element={<BlankLayout />}>
            <Route path='/search' element={<Search />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
