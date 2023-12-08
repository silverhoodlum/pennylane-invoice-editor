import { useApi } from 'api'

const FindCostumer = (id: number, firstName: string) => {
  const api = useApi()
  api.getSearchCustomers(firstName).then(({ data }) => {
    console.log(data)
    return data.customers.find((customer) => customer.id === id)
  })
}

export default FindCostumer
