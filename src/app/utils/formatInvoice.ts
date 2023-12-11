import { InvoiceUpdatePayload } from 'app/types/types'
import { Invoice } from 'types'
import { FieldValues, useForm } from 'react-hook-form'

const formatInvoiceUpdate = (invoice: FieldValues) => {
  const formattedData: any = {
    invoice: {
      ...invoice,
      invoice_lines_attributes: [...invoice.invoice_lines],
    },
  }
  delete formattedData.invoice.invoice_lines
  delete formattedData.total
  delete formattedData.tax
  delete formattedData.customer
  return formattedData
}

export default formatInvoiceUpdate
