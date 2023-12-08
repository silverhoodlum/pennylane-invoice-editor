import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useApi } from 'api'
import { Invoice } from 'types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
    })
  }, [api, id])

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formCustomer">
          <Form.Label>Customer</Form.Label>
          <Form.Control type="customer" placeholder="Customer" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Adress</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Address"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCustomer">
          <Form.Label>Customer</Form.Label>
          <Form.Control type="customer" placeholder="Customer" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

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
                <Form.Control type="text" placeholder="product" />
              </td>
              <td>
                <Form.Control type="text" placeholder="product" />
              </td>
              <td>
                <Form.Control type="text" placeholder="product" />
              </td>
              <td>
                <Form.Control type="text" placeholder="product" />
              </td>
              <td>
                <Form.Control type="text" placeholder="product" />
              </td>
              <td>
                <Form.Control type="text" placeholder="product" />
              </td>
            </tr>
          </tbody>
        </Table>

        <Button variant="primary">Add Line</Button>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
    </div>
  )
}

export default InvoiceShow
