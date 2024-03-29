import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  Dashboard as DashboardIcon,
  Apps as AppsIcon,
  ExpandLess,
  ExpandMore,
  AccountBox,
  Group,
  Collections,
  Apps,
  LocalAtm,
} from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Collapse, Drawer, Hidden } from '@material-ui/core'
import { useRouter } from 'next/router'
import ApplicationList from '../application/ApplicationList'
import { useSession } from 'next-auth/client'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const SidebarDrawer = (props) => {
  const { window } = props
  const [session] = useSession()
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const [appsOpen, setAppsOpen] = useState(true)

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={() => router.push('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        {session.user?.roles === 'client' && (
          <>
            <ListItem button onClick={() => setAppsOpen(!appsOpen)}>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary={'Aplicaciones'} />
              {appsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={appsOpen} timeout="auto" unmountOnExit>
              <ApplicationList />
            </Collapse>

            <Divider />

            <ListItem
              button
              onClick={() => router.push('/configuration/account')}
            >
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Cuenta" />
            </ListItem>
          </>
        )}

        {session.user?.roles === 'admin' && (
          <>
            <ListItem button onClick={() => router.push('/admin/applications')}>
              <ListItemIcon>
                <Apps />
              </ListItemIcon>
              <ListItemText primary="Aplicaciones" />
            </ListItem>

            <ListItem button onClick={() => router.push('/admin/users')}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItem>

            <ListItem
              button
              onClick={() => router.push('/admin/full-products')}
            >
              <ListItemIcon>
                <Collections />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>

            <ListItem button onClick={() => router.push('/admin/billing')}>
              <ListItemIcon>
                <LocalAtm />
              </ListItemIcon>
              <ListItemText primary="Facturación" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SidebarDrawer
