import { useQuery } from 'react-query'
import api from '../../utils/api'
import { PRODUCTS_URL } from '../../utils/constants'

const getProducts = async ({
  queryKey: [url, token, appId, page, size, search],
}) => {
  const { data } = await api().get(url, {
    headers: { Authorization: 'Bearer ' + token },
    params: { appId, page, size, search },
  })
  return data
}

export default function useProducts(
  { token, appId, page, size, search },
  options = {}
) {
  return useQuery(
    [PRODUCTS_URL, token, appId, page, size, search],
    getProducts,
    options
  )
}
