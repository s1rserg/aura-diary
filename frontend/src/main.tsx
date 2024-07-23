import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.tsx'
import './assets/styles/style.css'
import { ToastContainer } from 'react-toastify'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)
