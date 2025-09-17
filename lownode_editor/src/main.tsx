import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(
  //非空断言root
  document.getElementById('root')!
).render(
  <App />
)