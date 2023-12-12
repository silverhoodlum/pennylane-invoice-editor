import { InvoiceLineD, InvoiceLineData } from 'app/types/types'

const linesCheck = (invoiceLines?: InvoiceLineD[]) => {
  const allHaveProducts = invoiceLines
    ? invoiceLines.every((line) => line.product)
    : false
  const hasLines = invoiceLines ? Boolean(invoiceLines.length) : false
  const areValid = hasLines && allHaveProducts
  let error = ''
  console.log(areValid)
  if (!hasLines) {
    error = 'One invoice line is require'
  } else if (!allHaveProducts) {
    error = 'Make sure you select a product on each line'
  }
  return { areValid, error }
}

// const linesCheck = (invoiceLines: InvoiceLineData[]) => {
//     const allHaveProducts = invoiceLines.every((line) => line.product)
//     const noLines = !Boolean(invoiceLines.some((line) => line._destroy === false))
//     const areValid = !noLines && allHaveProducts
//     let error = ''
//     console.log(invoiceLines)
//     if (noLines) {
//       error = 'One invoice line is require'
//     } else if (!allHaveProducts) {
//       error = 'Make sure you select a product on each line'
//     }
//     return { areValid, error }
//   }

export default linesCheck
