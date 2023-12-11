import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useApi } from 'api'
import { Customer, Invoice, Product } from 'types'

import Button from 'react-bootstrap/Button'

import InvoiceTemplate from '../InvoiceTemplate'

const InvoiceCreate = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  const [show, setShow] = useState(false)

  const blankInvoice = {
    id: null,
    customer_id: 0,
    finalized: false,
    paid: false,
    date: null,
    deadline: null,
    total: null,
    tax: null,
    invoice_lines: [],
  }

  useEffect(() => {}, [api, id])

  return (
    <div>
      <h2>Create Invoice: {id}</h2>

      <InvoiceTemplate
        btnLabel="Create Invoice"
        invoiceExisting={blankInvoice}
      />
    </div>
  )
}

export default InvoiceCreate
