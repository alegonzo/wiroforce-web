import React from 'react'
import { makeStyles } from '@material-ui/core'
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const LoginLayout = ({ children, title }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={classes.content}>{children}</main>
    </div>
  )
}

export default LoginLayout
