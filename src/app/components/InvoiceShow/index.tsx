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
import InvoiceTemplate from '../InvoiceTemplate'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  const [show, setShow] = useState(false)

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(JSON.parse(JSON.stringify(data)))

      // setCustomer(parsedData.customer)
    })
  }, [api, id])

  return (
    <div>
      <h2>Invoice: {id}</h2>
      {invoice ? <InvoiceTemplate invoice={invoice} /> : <div>Loading</div>}
      <pre>{JSON.stringify(invoice ?? '', null, 2)}</pre>
    </div>
  )
}

export default InvoiceShow
