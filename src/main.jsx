import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {reducer, initialState} from './Utility/reducer.js'
import DataProvider from './Components/DataProvider/DataProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
    <App />
    </DataProvider>
  </StrictMode>,
)
