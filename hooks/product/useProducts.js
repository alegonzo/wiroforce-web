import { useQuery } from 'react-query'
import { api } from '../../utils/api'

import { PRODUCTS_URL } from '../../utils/constants'

const getProducts = async ({ queryKey: [url, appId, page, size, search] }) => {
  const { data } = await api(url, {
    params: { appId, page, size, search },
  })
  return data
}

export default function useProducts(
  { appId, page, size, search },
  options = {}
) {
  return useQuery(
    [PRODUCTS_URL, appId, page, size, search],
    getProducts,
    options
  )
}
