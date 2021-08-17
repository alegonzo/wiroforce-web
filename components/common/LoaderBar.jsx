import React from 'react'
import { Container, LinearProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  loadingBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const LoaderBar = () => {
  const classes = useStyles()

  return (
    <Container>
      <div className={classes.loadingBar}>
        <LinearProgress color="secondary" />
      </div>
    </Container>
  )
}

export default LoaderBar
