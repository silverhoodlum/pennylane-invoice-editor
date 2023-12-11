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

  useEffect(() => {}, [api, id])

  return (
    <div>
      <h2>Invoice: {id}</h2>

      <InvoiceTemplate />
    </div>
  )
}

export default InvoiceCreate
