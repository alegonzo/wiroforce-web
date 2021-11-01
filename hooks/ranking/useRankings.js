import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { RANKINGS_URL } from '../../utils/constants'

const getRankings = async ({ queryKey }) => {
  const { data } = await api(queryKey[0], {
    method: 'get',
    params: queryKey[1],
  })
  return data
}

export default function useRankings(params, options = {}) {
  return useQuery([RANKINGS_URL, params], getRankings, options)
}
