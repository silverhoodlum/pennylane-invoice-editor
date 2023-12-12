import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import InvoicesList from './components/InvoicesList'
import InvoiceShow from './components/InvoiceShow'

import InvoiceCreate from './components/InvoiceCreate'
import NavbarComponent from './components/Navbar/navbar'

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="px-5">
        <Router>
          <Routes>
            <Route path="/invoice/:id" Component={InvoiceShow} />
            <Route path="/" Component={InvoicesList} />
            <Route path="/create" Component={InvoiceCreate} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
