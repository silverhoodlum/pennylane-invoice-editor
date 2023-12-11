import React from 'react'

const priceBreakdown = (
  unit_price: string,
  unit_tax: string,
  quantity: number
) => {
  const totalPrice = Number(unit_price) * quantity
  return {
    line_price: String(totalPrice),
    line_tax: String(Number(unit_tax) * quantity),
  }
}

export default priceBreakdown
