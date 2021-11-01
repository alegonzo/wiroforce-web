import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { RANKING_PLAYERS_URL } from '../../utils/constants'

const getRankingPlayers = async ({ queryKey }) => {
  const { data } = await api(queryKey[0], {
    method: 'get',
    params: queryKey[1],
  })
  return data
}

export default function useRankingPlayers(params, options = {}) {
  return useQuery([RANKING_PLAYERS_URL, params], getRankingPlayers, options)
}
