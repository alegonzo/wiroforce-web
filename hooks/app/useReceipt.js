import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { APPLICATIONS_RECEIPT_URL } from '../../utils/constants'

const getReceipt = async ({ queryKey: [url] }) => {
  const { data } = await api(url, {
    responseType: 'blob',
  })
  return data
}

export default function useReceipt(id, options = {}) {
  return useQuery([APPLICATIONS_RECEIPT_URL(id)], getReceipt, options)
}
