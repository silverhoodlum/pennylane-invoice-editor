import React from 'react'

interface vatCalcProps {
  [key: string]: number
}

const priceBreakdown = (
  unit_price: string,
  vat_rate: string,
  quantity: number
) => {
  const totalPrice = Number(unit_price) * quantity

  const vatCalc: vatCalcProps = {
    '0': 0,
    '5.5': 0.0521326,
    '10': 0.0909091,
    '20': 0.1666666,
  }
  return {
    line_price: String(totalPrice),
    line_tax: String((totalPrice * vatCalc[vat_rate]).toFixed(2)),
  }
}

export default priceBreakdown
