import { InvoiceLineD } from 'app/types/types'

const linesCheck = (invoiceLines?: InvoiceLineD[]) => {
  const allHaveProducts = invoiceLines
    ? invoiceLines.every((line) => line.product)
    : false
  const hasLines = invoiceLines ? Boolean(invoiceLines.length) : false
  const areValid = hasLines && allHaveProducts
  let error = ''
  if (!hasLines) {
    error = 'One invoice line is require'
  } else if (!allHaveProducts) {
    error = 'Make sure you select a product on each line'
  }
  return { areValid, error }
}

export default linesCheck
