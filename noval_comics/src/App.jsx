import './App.css'
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/pages/Home'));
const Bookstore = lazy(() => import('@/pages/Bookstore'));
const Comics = lazy(() => import('@/pages/Comics'));
const My = lazy(() => import('@/pages/My'));
function App() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* 带有tabbar的Layout */}
        <Routes >

          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bookstore" element={<Bookstore />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/my" element={<My />} />
          </Route>
          
          <Route element={<BlankLayout />}>
           
          </Route>

        </Routes>
      </Suspense>
    
    </>
  )
}

export default App