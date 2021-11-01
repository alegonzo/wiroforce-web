import { useQuery } from 'react-query'
import { api } from '../../utils/api'

import { APPLICATIONS_URL } from '../../utils/constants'

const getApps = async ({ queryKey }) => {
  const { data } = await api(queryKey[0], {
    method: 'get',
    params: queryKey[1],
  })
  return data
}

export default function useApps(params, options = {}) {
  return useQuery([APPLICATIONS_URL, params], getApps, options)
}
