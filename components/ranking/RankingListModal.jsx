import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import useRankingCount from '../../hooks/ranking/useRankingCount'
import useRankingPlayers from '../../hooks/ranking/useRankingPlayers'
import { api } from '../../utils/api'
import {
  RANKING_COUNT_URL,
  RANKING_PLAYERS_URL,
  RANKING_URL,
} from '../../utils/constants'
import useAppContext from '../AppContext'
import LoaderBar from '../common/LoaderBar'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const RankingListModal = ({ showForm, handleCloseForm, ranking }) => {
  const { setMessage, setShowBackdrop } = useAppContext()
  const classes = useStyles()
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(20)
  const queryClient = useQueryClient()

  const { data: count } = useRankingCount(ranking.id)
  const { data: players, isFetching } = useRankingPlayers({
    rankingId: ranking.id,
    start,
    end,
  })

  const handleResetRanking = async () => {
    let response = ''
    setShowBackdrop(true)
    try {
      await api(RANKING_URL(ranking.id), {
        method: 'delete',
      })
      response = 'Ranking Reseteado'

      queryClient.invalidateQueries(RANKING_COUNT_URL(ranking.id))
      queryClient.invalidateQueries(RANKING_PLAYERS_URL)
      setMessage({
        show: true,
        text: response,
        type: 'success',
      })
    } catch (e) {
      setMessage({
        show: true,
        text: 'Ha ocurrido un error',
        type: 'error',
      })
      return false
    } finally {
      setShowBackdrop(false)
    }
  }

  const handleGoBack = () => {
    if (start >= 20) {
      setStart(start - 20)
      setEnd(end - 20)
    }
  }

  const handleGoForward = () => {
    if (end < count) {
      setStart(start + 20)
      setEnd(end + 20)
    }
  }

  return (
    <Dialog
      open={showForm}
      onClose={handleCloseForm}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Lista de jugadores
        {ranking && <Typography>id: {ranking.id}</Typography>}
        {count && <Typography>Total de jugadores: {count}</Typography>}
      </DialogTitle>
      <Divider />

      <br />
      <DialogContent>
        <div>
          <IconButton
            color="primary"
            disabled={() => {
              if (count) {
                return start === 0
              }
              return true
            }}
            onClick={handleGoBack}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            disabled={() => {
              if (count) {
                return end >= count
              }
              return true
            }}
            color="primary"
            onClick={handleGoForward}
          >
            <ArrowForwardIos />
          </IconButton>
          <Button onClick={handleResetRanking} color="primary">
            Resetear
          </Button>
        </div>
        {isFetching && <LoaderBar />}
        {players?.length > 0 && !isFetching ? (
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Jugador</TableCell>
                  <TableCell align="right">Puntos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.rank}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : players?.length === 0 && !isFetching ? (
          <Grid justifyContent="center" container>
            <Typography style={{ marginTop: 150, textAlign: 'center' }}>
              No hay jugadores
            </Typography>
          </Grid>
        ) : (
          ''
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForm} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RankingListModal
