import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useApi } from 'api'
import { Customer, Invoice, Product } from 'types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Table from 'react-bootstrap/Table'
import { Stack } from 'react-bootstrap'
import CustomerAutocomplete from '../CustomerAutocomplete'
import ProductAutocomplete from '../ProductAutocomplete'
import Modal from 'react-bootstrap/Modal'
import { FieldValues, useForm } from 'react-hook-form'

interface InvoiceTemplateProps {
  invoiceExisting?: Invoice
}
interface customerSelectProps {
  e: Customer | null
  updateStateCustomer: React.Dispatch<React.SetStateAction<Customer | null>>
  name: 'customer'
}

const InvoiceTemplate = ({ invoiceExisting }: InvoiceTemplateProps) => {
  const previousInvoice = invoiceExisting ? true : false
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [products, setProducts] = useState<(Product | null)[]>([])
  const [invoice, setInvoice] = useState<Invoice>()

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: invoiceExisting,
  })

  const [completeAddress, setCompleteAddress] = useState(false)
  const [fullAddress, setFullAddress] = useState<string>()

  previousInvoice && console.log(invoiceExisting)
  const onSubmit = (data: FieldValues) => {
    console.log('Form Data: ')
    console.log(data)
  }

  const handleChangeCustomer = ({
    e,
    updateStateCustomer,
    name,
  }: customerSelectProps) => {
    updateStateCustomer(e)

    if (e) {
      setValue(name, e)
    }
  }

  const handleChangeProduct = (e: Product | null, index: number) => {
    setProducts(
      products.map((product, i) => {
        return i === index ? e : product
      })
    )

    if (e) {
      setValue(`invoice_lines.${index}.product`, e)
    }
  }
  useEffect(() => {
    if (previousInvoice) {
      invoiceExisting?.customer && setCustomer(invoiceExisting.customer)

      /* Address complete */
      setFullAddress(
        `${invoiceExisting?.customer?.address} ${invoiceExisting?.customer?.city} ${invoiceExisting?.customer?.country} ${invoiceExisting?.customer?.country_code}`
      )
      setCompleteAddress(true)

      /* Invoice lines display */
      invoiceExisting && setInvoice(invoiceExisting)
      invoiceExisting &&
        setProducts(invoiceExisting?.invoice_lines.map((line) => line.product))
      // invoice?.invoices.forEach((line) =>
      //   setProduct((prev) => [...prev].push(line.product))
      // )
    }
  }, [])

  useEffect(() => {
    console.log('Customer:')
    console.log(customer)
    setFullAddress(
      `${customer?.address} ${customer?.city} ${customer?.country} ${customer?.country_code}`
    )
  }, [customer])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formCustomer">
        <Form.Label>Select a customer</Form.Label>
        <CustomerAutocomplete
          value={customer}
          {...register('customer')}
          onChange={(e) =>
            handleChangeCustomer({
              e,
              updateStateCustomer: setCustomer,
              name: 'customer',
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        {completeAddress && (
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Address"
            value={fullAddress}
            disabled
          />
        )}
        <Stack>
          <Button variant="secondary" className="ms-auto" onClick={handleShow}>
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
              <Form.Control
                type="text"
                placeholder="street name"
                {...register('customer.address')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. City"
                {...register('customer.city')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. France"
                {...register('customer.country')}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCountryCode">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. TU"
                {...register('customer.country_code')}
              />
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
        <Form.Control type="date" {...register('date')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="date" {...register('deadline')} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPaid">
        <Form.Check type="checkbox" label="Paid" {...register('paid')} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFinalized">
        <Form.Check
          type="checkbox"
          label="Finalized"
          {...register('finalized')}
        />
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
            {invoice &&
              invoice.invoice_lines.map((invoiceLine, index) => {
                return (
                  <tr>
                    <td>
                      <ProductAutocomplete
                        value={products[index]}
                        {...register(`invoice_lines.${index}.product`)}
                        onChange={(e) => handleChangeProduct(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        {...register(`invoice_lines.${index}.quantity`)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="e. g. piece"
                        {...register(`invoice_lines.${index}.unit`)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="vat rate"
                        step="any"
                        {...register(`invoice_lines.${index}.vat_rate`)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        step="any"
                        {...register(`invoice_lines.${index}.tax`)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        step="any"
                        {...register(`invoice_lines.${index}.price`)}
                      />
                    </td>
                  </tr>
                )
              })}
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
  )
}

export default InvoiceTemplate
