import { InvoiceLine } from 'app/types/types'
import React from 'react'

const getTotalPrice = (invoiceLines: InvoiceLine[]) => {
  const sum = invoiceLines
    .map((lines) => Number(lines.price))
    .reduce((prev, curr) => prev + curr, 0)
  return String(sum)
}

export default getTotalPrice
