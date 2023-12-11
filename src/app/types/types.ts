import { Product } from 'types'

export interface InvoiceD {
  /**
   * example:
   * 5785
   */
  id: number
  /**
   * example:
   * 6773
   */
  customer_id: number | null
  /**
   * example:
   * false
   */
  customer?: CustomerD
  finalized: boolean
  /**
   * example:
   * true
   */
  paid: boolean
  /**
   * example:
   * 2021-02-03
   */
  date: string | null
  /**
   * example:
   * 2021-03-05
   */
  deadline: string | null
  /**
   * example:
   * 120.00
   */
  total: string | null
  /**
   * example:
   * 20.00
   */
  tax: string | null
  invoice_lines: InvoiceLineD[]
}

export interface InvoiceLineD {
  /**
   * example:
   * 9181
   */
  id?: number
  /**
   * example:
   * 5785
   */
  invoice_id?: number
  /**
   * example:
   * 67
   */
  product_id?: number
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
  product?: Product
}

export interface CustomerD {
  /**
   * example:
   * 6773
   */
  id: number
  /**
   * example:
   * Jean
   */
  first_name: string
  /**
   * example:
   * Dupont
   */
  last_name: string
  /**
   * example:
   * 9 impasse Sauvey
   */
  address: string
  /**
   * example:
   * 50100
   */
  zip_code: string
  /**
   * example:
   * Cherbourg
   */
  city: string
  /**
   * example:
   * France
   */
  country: string
  /**
   * example:
   * FR
   */
  country_code: string
}

export interface InvoiceUpdatePayload {
  /**
   * example:
   * 6757
   */
  id: number
  /**
   * example:
   * 6773
   */
  customer_id?: number | null
  /**
   * example:
   * false
   */
  finalized?: boolean
  /**
   * example:
   * true
   */
  paid?: boolean
  /**
   * example:
   * 2021-02-03
   */
  date?: string | null
  /**
   * example:
   * 2021-03-05
   */
  deadline?: string | null
  invoice_lines?: InvoiceLineUpdatePayload[]
  invoice_lines_attributes?: InvoiceLineUpdatePayload[] | InvoiceLineD[]
}

export interface InvoiceLineUpdatePayload {
  /**
   * If this parameter is set, the identified invoice_line will be updated (or deleted if _destroy is set to true) If this parameter is not set, a new invoice_line will be created
   *
   * example:
   * 45
   */
  id?: number
  /**
   * If this parameter is set to true, and if "id" is set, the identified invoice_line will be deleted
   *
   * example:
   * false
   */
  _destroy?: boolean
  /**
   * example:
   * 67
   */
  product_id?: number
  /**
   * example:
   * 1
   */
  quantity?: number
  /**
   * example:
   * Tesla Model S with Pennylane logo
   */
  label?: string
  unit?: Unit
  vat_rate?: VatRate
  /**
   * example:
   * 120.00
   */
  price?: string | number
  /**
   * example:
   * 20.00
   */
  tax?: string | number
}

export interface InvoiceLineCreatePayload {
  /**
   * example:
   * 67
   */
  product_id: number
  /**
   * example:
   * 1
   */
  quantity?: number
  /**
   * example:
   * Tesla Model S with Pennylane logo
   */
  label?: string
  unit?: Unit
  vat_rate?: VatRate
  /**
   * example:
   * 120.00
   */
  price?: string | number
  /**
   * example:
   * 20.00
   */
  tax?: string | number
}

export type Unit = 'hour' | 'day' | 'piece'
export type VatRate = '0' | '5.5' | '10' | '20'
