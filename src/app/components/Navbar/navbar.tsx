import { Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid={'sm'}>
          <Navbar.Brand href="/">
            <h1 style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <FontAwesomeIcon
                icon={faFileInvoice}
                className="fs-1 me-3"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />
              INVOICE EDITOR 2.0
            </h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent
