import { InvoiceLineD } from 'app/types/types'

const lineContainsProduct = (
  invoicelines: InvoiceLineD[],
  product_id: number
) => {
  return invoicelines.some((line) => line.product_id === product_id)
}

export default lineContainsProduct
