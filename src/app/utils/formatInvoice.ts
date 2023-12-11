import { InvoiceUpdatePayload } from 'app/types/types'
import { Invoice } from 'types'
import { FieldValues, useForm } from 'react-hook-form'

const formatInvoice = (invoice: FieldValues) => {
  const formattedData: any = {
    invoice: {
      ...invoice,
      invoice_lines_attributes: [...invoice.invoice_lines].map((line) => {
        return { ...line, _destroy: false }
      }),
    },
  }
  delete formattedData.invoice.invoice_lines

  return formattedData
}

export default formatInvoice
