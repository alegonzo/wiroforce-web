import { useQuery } from 'react-query'
import api from '../../utils/api'
import { APPLICATIONS_URL } from '../../utils/constants'

const getApps = async ({ queryKey: [url, token, { params }] }) => {
  const { data } = await api().get(url, {
    headers: { Authorization: 'Bearer ' + token },
    params: params,
  })
  return data
}

export default function useApps({ token, ...params }, options = {}) {
  return useQuery([APPLICATIONS_URL, token, params], getApps, options)
}
