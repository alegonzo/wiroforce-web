import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'
import useAppContext from '../AppContext'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const FullScreenLoader = () => {
  const classes = useStyles()
  const { showBackdrop, setShowBackdrop } = useAppContext()

  return (
    <Backdrop
      className={classes.backdrop}
      open={showBackdrop}
      onClick={setShowBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default FullScreenLoader
