import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ApiProvider } from '../api'

import 'bootstrap/dist/css/bootstrap.min.css'

const domRoot = document.getElementById('root')
const root = createRoot(domRoot!)

root.render(
  <React.StrictMode>
    <ApiProvider
      url="https://jean-test-api.herokuapp.com/"
      token="2f9c9e2a-26ee-42d9-9b42-bede9da6265a" // set your api token here
    >
      <App />
    </ApiProvider>
  </React.StrictMode>
)
