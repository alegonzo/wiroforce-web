import { useQuery } from 'react-query'
import api from '../../utils/api'
import { COMPANIES_URL } from '../../utils/constants'

const getCompanies = async ({ queryKey: [url, token] }) => {
  const { data } = await api().get(url, {
    headers: { Authorization: 'Bearer ' + token },
  })
  return data
}

export default function useCompanies({ token }, options = {}) {
  return useQuery([COMPANIES_URL, token], getCompanies, options)
}
