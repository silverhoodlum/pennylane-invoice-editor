import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import InvoicesList from './components/InvoicesList'
import InvoiceShow from './components/InvoiceShow'

import GettingStarted from './GettingStarted'

function App() {
  return (
    <div className="px-5">
      <Router>
        <Routes>
          <Route path="/invoice/:id" Component={InvoiceShow} />
          <Route path="/" Component={InvoicesList} />
          <Route path="/create" Component={InvoicesList} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
