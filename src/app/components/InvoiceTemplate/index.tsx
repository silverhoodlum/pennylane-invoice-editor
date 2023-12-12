import { useState, useEffect } from 'react'

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import priceBreakdown from 'app/utils/price-breadown'
import { InvoiceD, InvoiceLineD } from 'app/types/types'
import _, { random } from 'lodash'
import { VatRate, Unit } from 'app/utils/enums'
import getTotalPrice from 'app/utils/total-price'
import {
  formatInvoiceCreate,
  formatInvoiceUpdate,
} from 'app/utils/formatInvoice'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import linesCheck from 'app/utils/invoice-lines.validation'
import ModalStatus from '../ModalStatus'

import './invoice-template.styles.css'

interface InvoiceTemplateProps {
  invoiceExisting?: Invoice | InvoiceD
  btnLabel?: string
  action: 'update' | 'create'
}

const InvoiceTemplate = ({
  invoiceExisting,
  btnLabel,
  action,
}: InvoiceTemplateProps) => {
  const previousInvoice = invoiceExisting ? true : false
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [products, setProducts] = useState<(Product | null)[]>([])
  const [invoice, setInvoice] = useState<InvoiceD>()
  const [finalized, setFinalized] = useState<boolean | undefined>(false)
  const [invoiceDeleted, setInvoiceDeleted] = useState<boolean>(false)
  const [invoiceUpdated, setInvoiceUpdated] = useState<boolean>(false)
  const [linesValidationError, setLinesValidationError] = useState({
    status: false,
    message: '',
  })

  const api = useApi()

  const [show, setShow] = useState(false)
  const [showDel, setShowDel] = useState(false)
  const [showUpd, setShowUpd] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCloseDel = () => setShowDel(false)
  const handleDel = () => setShowDel(true)

  const handleCloseUpd = () => setShowUpd(false)
  const handleUpd = () => setShowUpd(true)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: invoiceExisting,
  })

  const [completeAddress, setCompleteAddress] = useState(false)
  const [fullAddress, setFullAddress] = useState<string>()

  const navigate = useNavigate()

  useEffect(() => {
    /* Initial load */
    if (previousInvoice) {
      invoiceExisting?.customer && setCustomer(invoiceExisting.customer)

      /* Fill Address if customer exists */
      if (invoiceExisting && invoiceExisting.customer !== undefined) {
        setFullAddress(
          `${invoiceExisting?.customer?.address} ${invoiceExisting?.customer?.city} ${invoiceExisting?.customer?.country} ${invoiceExisting?.customer?.country_code}`
        )
        setCompleteAddress(true)
      }

      /* Invoice lines display */
      invoiceExisting &&
        setInvoice({
          ...invoiceExisting,
          invoice_lines: invoiceExisting.invoice_lines.map((line) => ({
            ...line,
            display: true,
            _destroy: false,
          })),
        })
      invoiceExisting &&
        setProducts(
          invoiceExisting?.invoice_lines.map((line) =>
            line.product ? line.product : null
          )
        )
      /* In invoice is finalised, disable other inputs */
      invoiceExisting?.finalized && setFinalized(true)
    }
  }, [])

  useEffect(() => {
    setFullAddress(
      `${customer?.address} ${customer?.city} ${customer?.country} ${customer?.country_code}`
    )
  }, [customer])

  useEffect(() => {
    console.log(products)
  }, [products])

  const onSubmit = (data: FieldValues) => {
    if (!linesCheck(invoice?.invoice_lines)?.areValid) {
      setLinesValidationError({
        status: true,
        message: linesCheck(invoice?.invoice_lines)?.error,
      })
      return
    }

    if (action === 'update') {
      api
        .putInvoice(invoice?.id, formatInvoiceUpdate(data))
        .then(({ data }) => {
          setInvoiceUpdated(true)
          setShowUpd(true)
          setTimeout(function () {
            setInvoiceUpdated(false)
            setShowUpd(false)
          }, 2000)

          navigate(`/invoice/${data.id}`)
        })
    } else if (action === 'create') {
      api.postInvoices(null, formatInvoiceCreate(data)).then(({ data }) => {
        navigate(`/invoice/${data.id}`)
      })
    }
  }

  const handleChangeCustomer = (e: Customer | null) => {
    setCustomer(e)

    if (e) {
      setValue('customer', e)
      setFullAddress(`${e.address} ${e.city} ${e.country} ${e.country_code}`)
      setCompleteAddress(true)
      invoice && setInvoice({ ...invoice, customer_id: e.id })
      setValue('customer_id', e.id)
    }
  }

  const handleChangeProduct = (e: Product | null, index: number) => {
    /* update product in product array */
    setProducts(
      products.map((product, i) => {
        return i === index ? e : product
      })
    )

    if (invoice?.invoice_lines && e?.vat_rate) {
      const updatedLines = invoice.invoice_lines.map((line, i) => {
        const { line_price, line_tax } = priceBreakdown(
          e.unit_price,
          e.vat_rate,
          1
        )
        return i === index
          ? {
              ...line,
              product: e,
              product_id: e?.id,
              vat_rate: e?.vat_rate,
              unit: e?.unit,
              label: e?.label,
              price: line_price,
              tax: line_tax,
              quantity: 1,
            }
          : line
      })

      setInvoice({
        ...invoice,
        invoice_lines: updatedLines,
        total: getTotalPrice(updatedLines, 'price'),
        tax: getTotalPrice(updatedLines, 'tax'),
      })
      /* update form field */
      if (e) {
        setValue('invoice_lines', updatedLines)
        setValue('total', getTotalPrice(updatedLines, 'price'))
        setValue('tax', getTotalPrice(updatedLines, 'tax'))
      }
    }

    setLinesValidationError({ status: false, message: '' })
    /* update form in product array */
    if (e) {
      setValue(`invoice_lines.${index}.product`, e)
    }
  }

  const handleQuantityChange = (
    e: React.BaseSyntheticEvent,
    index: number,
    name: 'quantity' | 'vat_rate'
  ) => {
    if (invoice?.invoice_lines) {
      const updatedLines = invoice.invoice_lines.map((line, i) => {
        const { line_price, line_tax } = priceBreakdown(
          line.product ? line.product.unit_price : '0',
          name === 'quantity' ? line.vat_rate : e.target.value,
          name === 'quantity' ? e.target.value : line.quantity
        )
        return i === index
          ? {
              ...line,
              [name]: Number(e.target.value),
              tax: line_tax,
              price: line_price,
            }
          : line
      })
      setInvoice({
        ...invoice,
        invoice_lines: updatedLines,
        total: getTotalPrice(updatedLines, 'price'),
        tax: getTotalPrice(updatedLines, 'tax'),
      })

      setValue('invoice_lines', updatedLines)
      setValue('total', getTotalPrice(updatedLines, 'price'))
      setValue('tax', getTotalPrice(updatedLines, 'tax'))
    }
  }

  const addInvoiceLine = () => {
    if (invoice) {
      const emptyInvoiceLine: InvoiceLineD = {
        product_id: 0,
        price: '0',
        tax: '0',
        quantity: 0,
        unit: 'piece',
        vat_rate: '0',
        label: '',
      }
      if (invoice?.invoice_lines) {
        const updatedLines = [...invoice?.invoice_lines]
        updatedLines.push(emptyInvoiceLine)
        setInvoice({ ...invoice, invoice_lines: updatedLines })
      }
    }
  }

  const handleFinalized = (e: React.BaseSyntheticEvent) => {
    setFinalized(e.target.checked)
    setValue('finalized', e.target.checked)
  }

  const deleteLine = (index: number) => {
    if (invoice?.invoice_lines) {
      const updatedLinesLocal = invoice.invoice_lines.filter(
        (line, i) => i !== index
      )

      setInvoice({
        ...invoice,
        total: getTotalPrice(updatedLinesLocal, 'price'),
        tax: getTotalPrice(updatedLinesLocal, 'tax'),
        invoice_lines: updatedLinesLocal,
      })
      setProducts([...products].filter((product, i) => i !== index))

      const formLines = getValues('invoice_lines').map((line, i) =>
        index === i
          ? {
              ...line,
              quantity: 0,
              vat_rate: VatRate.zero,
              price: '0',
              tax: '0',
              _destroy: true,
            }
          : line
      )
      setValue('invoice_lines', formLines)
    }
  }

  const backtoHomepage = () => {
    navigate('/')
  }
  const handleDeleteInvoice = () => {
    invoice &&
      api.deleteInvoice(invoice.id).then(({ data }) => {
        setInvoiceDeleted(true)
      })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formCustomer">
        <Form.Label>Select a customer</Form.Label>
        <CustomerAutocomplete
          value={customer}
          {...register('customer')}
          onChange={(e) => handleChangeCustomer(e)}
          disabled={finalized}
        />
      </Form.Group>
      {errors.customer?.address && (
        <p className="text-danger">{errors.customer.address.message}</p>
      )}
      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        {completeAddress && (
          <Form.Control
            as="textarea"
            rows={2}
            type="text"
            placeholder="Address"
            value={fullAddress}
            disabled
          />
        )}
        <Stack className="mt-1">
          <Button
            variant="secondary"
            className="ms-auto"
            onClick={handleShow}
            disabled={finalized}
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
              <Form.Control
                type="text"
                placeholder="street name"
                {...register('customer.address', {
                  required: 'Customer is needed',
                })}
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
      <Stack direction="horizontal" className="w-50">
        <Stack direction="vertical">
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register('date', { required: 'Date is required' })}
              disabled={finalized}
            />
            {errors.date && (
              <p className="text-danger">{errors.date.message}</p>
            )}
          </Form.Group>
        </Stack>
        <Stack direction="vertical">
          <Form.Group className="mb-3 ms-5" controlId="formDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              {...register('deadline', { required: 'Deadline is required' })}
              disabled={finalized}
            />
            {errors.deadline && (
              <p className="text-danger">{errors.deadline.message}</p>
            )}
          </Form.Group>
        </Stack>
      </Stack>
      <Form.Group className="mb-3" controlId="formPaid">
        <Form.Check type="checkbox" label="Paid" {...register('paid')} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFinalized">
        <Form.Check
          type="checkbox"
          label="Finalized"
          {...register('finalized')}
          onChange={handleFinalized}
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoice &&
              invoice.invoice_lines.map((invoiceLine, index) => {
                return (
                  <tr className={`invoice-line-${index}`}>
                    <td>
                      <ProductAutocomplete
                        value={products[index]}
                        disabled={finalized}
                        {...register(`invoice_lines.${index}.product`)}
                        onChange={(e) => handleChangeProduct(e, index)}
                      />
                    </td>
                    <td style={{ width: '10%' }}>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        min={1}
                        disabled={finalized}
                        {...register(`invoice_lines.${index}.quantity`)}
                        onChange={(e) =>
                          handleQuantityChange(e, index, 'quantity')
                        }
                      />
                    </td>
                    <td>
                      <Form.Select
                        aria-label="Default select example"
                        placeholder="e. g. piece"
                        disabled={finalized}
                        {...register(`invoice_lines.${index}.unit`)}
                      >
                        <option value={Unit.piece}>Piece</option>
                        <option value={Unit.hour}>Hour</option>
                        <option value={Unit.day}>Day</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Select
                        aria-label="Select vat rate"
                        placeholder="e. g. piece"
                        disabled={finalized}
                        {...register(`invoice_lines.${index}.vat_rate`)}
                        onChange={(e) =>
                          handleQuantityChange(e, index, 'vat_rate')
                        }
                      >
                        <option value={VatRate.zero}>0</option>
                        <option value={VatRate.five}>5.5</option>
                        <option value={VatRate.ten}>10</option>
                        <option value={VatRate.twenty}>20</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        step="any"
                        disabled
                        {...register(`invoice_lines.${index}.tax`)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        step="any"
                        disabled
                        {...register(`invoice_lines.${index}.price`)}
                      />
                    </td>
                    <td>
                      <Button variant="secondary" disabled={finalized}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          role="button"
                          onClick={() => deleteLine(index)}
                        />
                      </Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        {linesValidationError.status && (
          <p className="text-danger">{linesValidationError.message}</p>
        )}
        <Stack>
          <Button
            variant="dark"
            className="ms-auto"
            onClick={addInvoiceLine}
            disabled={finalized}
          >
            Add Line
          </Button>
        </Stack>
      </div>
      <Stack direction="vertical" className="mt-3 w-25 ms-auto">
        <Table className="striped  ">
          <tbody>
            <tr>
              <th>Tax:</th>
              <td>
                {invoice && (
                  <span className="fs-5">
                    {Number(invoice?.tax).toFixed(2)}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th>Total: </th>
              <td>
                {invoice && (
                  <span className="fs-2">
                    {Number(invoice?.total).toFixed(2)}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Stack>
      <Stack direction="horizontal">
        <div className="me-auto">
          {!invoiceDeleted ? (
            <ModalStatus
              message=" Are you sure you want to delete this invoice"
              btnPrimaryLabel="Delete"
              btnPrimaryFn={handleDeleteInvoice}
              btnPrimaryVariant="danger"
              btnSecondaryLabel="Cancel"
              btnSecondaryFn={handleCloseDel}
              show={showDel}
              hideFn={handleCloseDel}
            />
          ) : (
            <ModalStatus
              message=" Invoice has been deleted correctly"
              btnPrimaryLabel="Back to Homepage"
              btnPrimaryFn={backtoHomepage}
              show={showDel}
              hideFn={handleCloseDel}
            />
          )}

          <Button variant="danger" onClick={handleDel}>
            Delete
          </Button>
        </div>
        {btnLabel && (
          <div className="ms-auto">
            {invoiceUpdated && (
              <ModalStatus
                message="Invoice has been updated correctly"
                show={showUpd}
                hideFn={handleCloseUpd}
              />
            )}
            <Button variant="primary" type="submit" className="mx-auto">
              {btnLabel}
            </Button>
          </div>
        )}
      </Stack>
    </Form>
  )
}

export default InvoiceTemplate
