import { Product } from 'types'

export interface InvoiceLine {
  /**
   * example:
   * 9181
   */
  id: number
  /**
   * example:
   * 5785
   */
  invoice_id: number
  /**
   * example:
   * 67
   */
  product_id: number
  /**
   * example:
   * 1
   */
  quantity: number
  /**
   * example:
   * Tesla Model S with Pennylane logo
   */
  label: string
  unit: Unit
  vat_rate: VatRate
  /**
   * example:
   * 1s20.00
   */
  price: string
  /**
   * example:
   * 20.00
   */
  tax: string
  product: Product
}

export type Unit = 'hour' | 'day' | 'piece'
export type VatRate = '0' | '5.5' | '10' | '20'
