import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

ReactDOM.createRoot(
  //非空断言root
  document.getElementById('root')!
).render(
 <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
)