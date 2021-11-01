import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { COMPANIES_URL } from '../../utils/constants'

const getCompanies = async ({ queryKey: [url] }) => {
  const { data } = await api(url)
  return data
}

export default function useCompanies(options = {}) {
  return useQuery([COMPANIES_URL], getCompanies, options)
}
