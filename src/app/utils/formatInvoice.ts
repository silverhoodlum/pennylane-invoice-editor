import { InvoiceUpdatePayload } from 'app/types/types'
import { FieldValues } from 'react-hook-form'

export const formatInvoiceUpdate = (invoice: FieldValues) => {
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

export const formatInvoiceCreate = (invoice: FieldValues) => {
  const formattedData: any = {
    invoice: {
      ...invoice,
      invoice_lines_attributes: [...invoice.invoice_lines],
    },
  }
  delete formattedData.invoice.invoice_lines
  delete formattedData.invoice.id
  delete formattedData.invoice.total
  delete formattedData.invoice.customer
  return formattedData
}
