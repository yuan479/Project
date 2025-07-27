import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/components/MainLayout'

const Home = lazy(() => import('@/pages/Home'))
const Sort = lazy(() => import('@/pages/Sort'))
const BookStore = lazy(() => import('@/pages/Bookstore'))
const BookShelf = lazy(() => import('@/pages/BookShelf'))
const My = lazy(() => import('@/pages/My'))

function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/sort' element={<Sort />} />
            <Route path='/bookstore' element={<BookStore />} />
            <Route path='/bookshelf' element={<BookShelf />} />
            <Route path='/my' element={<My />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
