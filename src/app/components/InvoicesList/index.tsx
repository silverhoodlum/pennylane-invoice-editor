import { useApi } from 'api'
import { Customer, Invoice, Product } from 'types'
import { useEffect, useCallback, useState } from 'react'
import GettingStarted from 'app/GettingStarted'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import CustomerAutocomplete from '../CustomerAutocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross, faXmark } from '@fortawesome/free-solid-svg-icons'
import ProductAutocomplete from '../ProductAutocomplete'

const InvoicesList = (): React.ReactElement => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [filterTag, setFilterTag] = useState({ isActive: false, tagName: '' })
  const [productFilterTag, setProductFilterTag] = useState({
    isActive: false,
    tagName: '',
  })

  const api = useApi()
  const navigate = useNavigate()

  const [invoicesList, setInvoicesList] = useState<Invoice[]>([])
  const [filteredInvoicesList, setFilteredInvoicesList] = useState<Invoice[]>(
    []
  )

  const fetchInvoices = useCallback(async () => {
    const { data } = await api.getInvoices()
    setInvoicesList(data.invoices)
    setFilteredInvoicesList(data.invoices)
    console.log(data)
  }, [api])

  const handleRowClick = (id: number) => {
    navigate(`./invoice/${id}`)
  }

  const handleCustomerChange = (e: Customer | null) => {
    setCustomer(e)

    e &&
      setFilteredInvoicesList(
        filteredInvoicesList.filter((invoice) => invoice.customer_id === e.id)
      )
    e &&
      setFilterTag({
        isActive: true,
        tagName: `${e.first_name} ${e.last_name}`,
      })

    setCustomer(null)
  }

  const handleProductChange = (e: Product | null) => {
    setProduct(e)

    e &&
      setFilteredInvoicesList(
        filteredInvoicesList.filter((invoice) => invoice.customer_id === e.id)
      )
    e &&
      setProductFilterTag({
        isActive: true,
        tagName: `${e.label}`,
      })

    setCustomer(null)
  }

  const removeFilter = () => {
    setFilteredInvoicesList(invoicesList)
    setFilterTag({ isActive: false, tagName: '' })
  }

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return (
    <>
      <div className="my-2">
        <CustomerAutocomplete
          value={customer}
          onChange={(e) => handleCustomerChange(e)}
        />
      </div>

      <div className="mb-5">
        <ProductAutocomplete
          value={product}
          onChange={(e) => handleProductChange(e)}
        />
      </div>
      <Link to="/create">
        <Button className="my-3">Create Invoice</Button>
      </Link>
      <div className="my-2">
        {filterTag.isActive && (
          <Button variant="light" onClick={removeFilter}>
            <FontAwesomeIcon
              icon={faXmark}
              className="fs-3"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
              className="ps-2"
            >
              {filterTag.tagName}
            </span>
          </Button>
        )}
      </div>
      <div>
        {productFilterTag.isActive && (
          <Button variant="light" onClick={removeFilter}>
            <FontAwesomeIcon
              icon={faXmark}
              className="fs-3"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
              className="ps-2"
            >
              {filterTag.tagName}
            </span>
          </Button>
        )}
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Total</th>
            <th>Tax</th>
            <th>Finalized</th>
            <th>Paid</th>
            <th>Date</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoicesList.map((invoice) => (
            <tr
              key={invoice.id}
              onClick={() => handleRowClick(invoice.id)}
              role="button"
            >
              <td>{invoice.id}</td>

              <td>
                {invoice.customer?.first_name} {invoice.customer?.last_name}
              </td>
              <td>
                {invoice.customer?.address}, {invoice.customer?.zip_code}{' '}
                {invoice.customer?.city}
              </td>
              <td>{invoice.total}</td>
              <td>{invoice.tax}</td>
              <td>{invoice.finalized ? 'Yes' : 'No'}</td>
              <td>{invoice.paid ? 'Yes' : 'No'}</td>
              <td>{invoice.date}</td>
              <td>{invoice.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default InvoicesList
