import React from 'react'

const priceBreakdown = (unit_price: string, vat: string, quantity: number) => {
  const totalPrice = Number(unit_price) * quantity
  const vatPercentage = Number(vat) / 100
  return {
    line_price: String(totalPrice),
    line_tax: String(totalPrice * vatPercentage),
  }
}

export default priceBreakdown
