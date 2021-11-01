import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { RANKINGS_URL } from '../../utils/constants'

const getRankings = async ({ queryKey: [url, applicationId] }) => {
  const { data } = await api(url, {
    method: 'get',
    params: {
      applicationId,
    },
  })
  return data
}

export default function useRankings(applicationId, options = {}) {
  return useQuery([RANKINGS_URL, applicationId], getRankings, options)
}
