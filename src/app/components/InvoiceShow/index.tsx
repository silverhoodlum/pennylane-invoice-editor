import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useApi } from 'api'
import { Customer, Invoice, Product } from 'types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { Stack } from 'react-bootstrap'
import CustomerAutocomplete from '../CustomerAutocomplete'
import ProductAutocomplete from '../ProductAutocomplete'
import Modal from 'react-bootstrap/Modal'
import FindCostumer from 'app/utils/find-customer'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [product, setProduct] = useState<Product | null>(null)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [completeAddress, setCompleteAddress] = useState(false)

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
      console.log(data)
      console.log(`Customer: ${JSON.stringify(customer)}`)
    })
  }, [api, id, customer])

  return (
    <div>
      <h2>Invoice: {id}</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formCustomer">
          <Form.Label>Select a customer</Form.Label>
          {/* <CustomerAutocomplete
            value={FindCostumer(
              invoice?.customer_id,
              invoice?.customer?.first_name
             | )}
            onChange={setCustomer}
          /> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          {completeAddress && (
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Address"
            />
          )}
          <Stack>
            <Button
              variant="secondary"
              className="ms-auto"
              onClick={handleShow}
            >
              {completeAddress ? 'Edit' : 'Add'}
            </Button>
          </Stack>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enter your address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" placeholder="street name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="e.g. City" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="e.g. France" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCountryCode">
                <Form.Label>Country Code</Form.Label>
                <Form.Control type="text" placeholder="e.g. TU" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Update Address
              </Button>
            </Modal.Footer>
          </Modal>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Vat Rate</th>
                <th>Tax</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ProductAutocomplete value={product} onChange={setProduct} />
                </td>
                <td>
                  <Form.Control type="number" placeholder="0" />
                </td>
                <td>
                  <Form.Control type="text" placeholder="e. g. piece" />
                </td>
                <td>
                  <Form.Control type="number" placeholder="vat rate" />
                </td>
                <td>
                  <Form.Control type="number" placeholder="0" />
                </td>
                <td>
                  <Form.Control type="number" placeholder="0" />
                </td>
              </tr>
            </tbody>
          </Table>
          <Stack>
            <Button variant="secondary" className="ms-auto">
              Add Line
            </Button>
          </Stack>
        </div>
        <Stack direction="horizontal" className="mt-3">
          <div className="ms-auto">
            Total: <span className="fs-5">20</span>
          </div>
        </Stack>
        <Stack direction="horizontal">
          <Button variant="primary" type="submit" className="mx-auto">
            Submit
          </Button>
        </Stack>
      </Form>
      <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
    </div>
  )
}

export default InvoiceShow
