import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import InvoicesList from './components/InvoicesList'
import InvoiceShow from './components/InvoiceShow'

import GettingStarted from './GettingStarted'
import InvoiceCreate from './components/InvoiceCreate'

function App() {
  return (
    <div className="px-5">
      <Router>
        <Routes>
          <Route path="/invoice/:id" Component={InvoiceShow} />
          <Route path="/" Component={InvoicesList} />
          <Route path="/create" Component={InvoiceCreate} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
