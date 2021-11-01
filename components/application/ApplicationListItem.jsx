import {
  ListItemText,
  ListItem,
  ListItemIcon,
  Collapse,
  makeStyles,
  List,
} from '@material-ui/core'
import {
  ExpandLess,
  ExpandMore,
  Collections,
  TrendingUp,
  Equalizer,
} from '@material-ui/icons'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedMore: {
    paddingLeft: theme.spacing(6),
  },
}))

const ApplicationListItem = ({ application }) => {
  const [session] = useSession()
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const classes = useStyles()

  return (
    <>
      <ListItem
        button
        className={classes.nested}
        onClick={() => setExpanded(!expanded)}
      >
        <ListItemText primary={application.name} />
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nestedMore}
            onClick={() =>
              router.push(`/applications/${application.appId}/analitics`)
            }
          >
            <ListItemIcon>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText primary="Analítica" />
          </ListItem>

          <ListItem
            button
            className={classes.nestedMore}
            onClick={() =>
              router.push(`/applications/${application.appId}/products`)
            }
          >
            <ListItemIcon>
              <Collections />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>

          {session?.user?.company?.name === 'Conwiro' && (
            <ListItem
              button
              className={classes.nestedMore}
              onClick={() =>
                router.push(`/applications/${application.appId}/rankings`)
              }
            >
              <ListItemIcon>
                <Equalizer />
              </ListItemIcon>
              <ListItemText primary="Rankings" />
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  )
}

export default ApplicationListItem
