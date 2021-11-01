import { makeStyles } from '@material-ui/core'
import { signIn, useSession } from 'next-auth/client'
import Head from 'next/head'
import React, { useState } from 'react'
import CustomBreadcrumbs from '../common/CustomBreadcrumbs'
import Header from '../navigation/Header'
import SidebarDrawer from '../navigation/SidebarDrawer'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const Layout = ({ children, title, breadcrumbs }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [session, loading] = useSession()

  if (loading) return null

  if (!loading && !session) {
    signIn('wiroforce', {}, { prompt: false })
    return null
  }

  if (session) console.log(session)

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <SidebarDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CustomBreadcrumbs path={breadcrumbs} />
        {children}
      </main>
    </div>
  )
}

export default Layout
