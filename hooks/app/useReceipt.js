import { useQuery } from 'react-query'
import api from '../../utils/api'
import { APPLICATIONS_RECEIPT_URL } from '../../utils/constants'

const getReceipt = async ({ queryKey: [url, token] }) => {
  const { data } = await api().get(url, {
    headers: { Authorization: 'Bearer ' + token },
    responseType: 'blob',
  })
  return data
}

export default function useReceipt(id, token, options = {}) {
  return useQuery([APPLICATIONS_RECEIPT_URL(id), token], getReceipt, options)
}
