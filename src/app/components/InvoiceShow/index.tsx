import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useApi } from 'api'
import { Invoice } from 'types'

import InvoiceTemplate from '../InvoiceTemplate'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(JSON.parse(JSON.stringify(data)))
    })
  }, [api, id])

  return (
    <div>
      <h2>Invoice: {id}</h2>
      {invoice ? (
        <InvoiceTemplate
          invoiceExisting={invoice}
          btnLabel="Update Invoice"
          action="update"
        />
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default InvoiceShow
