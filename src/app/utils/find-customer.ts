import { useApi } from 'api'

const FindCostumer = async (id: number, firstName: string) => {
  const api = useApi()
  await api.getSearchCustomers(firstName).then(({ data }) => {
    console.log(data)
    return data.customers.find((customer) => customer.id === id)
  })
}

export default FindCostumer
