import { InvoiceLineD } from 'app/types/types'
import React from 'react'

const getTotalPrice = (invoiceLines: InvoiceLineD[], type: 'price' | 'tax') => {
  const sum = invoiceLines
    .map((lines) => Number(lines[type]))
    .reduce((prev, curr) => prev + curr, 0)
  return String(sum)
}

export default getTotalPrice
