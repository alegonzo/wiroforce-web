import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { RANKING_COUNT_URL } from '../../utils/constants'

const getRankingCount = async ({ queryKey }) => {
  const { data } = await api(queryKey[0], {
    method: 'get',
  })
  return data
}

export default function useRankingCount(id, options = {}) {
  return useQuery([RANKING_COUNT_URL(id)], getRankingCount, options)
}
