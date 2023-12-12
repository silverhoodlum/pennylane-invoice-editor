import { useApi } from 'api'
import { Customer, Invoice, Product } from 'types'
import { useEffect, useCallback, useState } from 'react'
import GettingStarted from 'app/GettingStarted'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Stack } from 'react-bootstrap'
import CustomerAutocomplete from '../CustomerAutocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross, faXmark } from '@fortawesome/free-solid-svg-icons'
import ProductAutocomplete from '../ProductAutocomplete'
import { InvoiceLineD, InvoiceLineData } from 'app/types/types'
import lineContainsProduct from 'app/utils/lineContainsProduct'

interface filterTagsProps {
  isActive: boolean
  tagName: string
  id: number | null
}

const InvoicesList = (): React.ReactElement => {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [filterTag, setFilterTag] = useState<filterTagsProps>({
    isActive: false,
    tagName: '',
    id: null,
  })
  const [productFilterTag, setProductFilterTag] = useState<filterTagsProps>({
    isActive: false,
    tagName: '',
    id: null,
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
        id: e.id,
      })

    setCustomer(null)
  }

  const handleProductChange = (e: Product | null) => {
    setProduct(e)

    e &&
      setFilteredInvoicesList(
        filteredInvoicesList.filter((invoice) =>
          lineContainsProduct(invoice.invoice_lines, e.id)
        )
      )
    e &&
      setProductFilterTag({
        isActive: true,
        tagName: e.label,
        id: e.id,
      })

    setProduct(null)
  }

  const checkOtherFilters = (name: 'customer' | 'product') => {
    if (name === 'customer' && productFilterTag.isActive) {
      setFilteredInvoicesList(
        invoicesList.filter((invoice) =>
          lineContainsProduct(
            invoice.invoice_lines,
            Number(productFilterTag.id)
          )
        )
      )
    } else if (name === 'product' && filterTag.isActive) {
      setFilteredInvoicesList(
        invoicesList.filter((invoice) => invoice.customer_id === filterTag.id)
      )
    }
  }
  const removeFilter = (name: 'product' | 'customer') => {
    setFilteredInvoicesList(invoicesList)
    if (name === 'customer') {
      setFilterTag({ isActive: false, tagName: '', id: null })
      checkOtherFilters('customer')
    } else {
      setProductFilterTag({ isActive: false, tagName: '', id: null })
      checkOtherFilters('product')
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return (
    <>
      <Stack direction="horizontal" className="w-100">
        <div className="my-2 " style={{ width: '30%' }}>
          <CustomerAutocomplete
            value={customer}
            onChange={(e) => handleCustomerChange(e)}
          />
        </div>

        <div className="ms-5" style={{ width: '30%' }}>
          <ProductAutocomplete
            value={product}
            onChange={(e) => handleProductChange(e)}
          />
        </div>
      </Stack>

      <Link to="/create">
        <Button className="my-3">Create Invoice</Button>
      </Link>
      <div className="my-2">
        {filterTag.isActive && (
          <Button variant="light" onClick={() => removeFilter('customer')}>
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
      <div className="my-2">
        {productFilterTag.isActive && (
          <Button variant="light" onClick={() => removeFilter('product')}>
            <FontAwesomeIcon
              icon={faXmark}
              className="fs-3"
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
            />
            <span
              style={{ display: 'inline-block', verticalAlign: 'middle' }}
              className="ps-2"
            >
              {productFilterTag.tagName}
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
