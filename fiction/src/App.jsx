import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import AI_chat from './pages/AI_chat'
import Search from './pages/Search'

const Home = lazy(() => import('@/pages/Home'))
const Sort = lazy(() => import('@/pages/Sort'))
const BookStore = lazy(() => import('@/pages/BookStore'))
const BookShelf = lazy(() => import('@/pages/BookShelf'))
const My = lazy(() => import('@/pages/My'))
const Detail = lazy(() => import('@/pages/Detail'))
const Read = lazy(() => import('@/pages/Read'))
const Chapters = lazy(() => import('@/pages/Chapters'))
const ComicView = lazy(() => import('@/pages/ComicView'))


function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/bookstore' element={<BookStore />} />
            <Route path='/bookshelf' element={<BookShelf />} />
            <Route path='/my' element={<My />} />
          </Route>

          <Route path='/ai_chat' element={<AI_chat />} />
          <Route path='/sort' element={<Sort />} />
          <Route path='/search' element={<Search />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/read/:id/:chapterId?' element={<Read />} />
          <Route path='/chapters/:id' element={<Chapters />} />
          <Route path='/comic/:id' element={<ComicView />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default App
