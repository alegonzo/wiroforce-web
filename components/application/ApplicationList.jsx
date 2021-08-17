import React, { useState } from 'react'
import {
  List,
  ListItem,
  makeStyles,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@material-ui/core'
import { useSession } from 'next-auth/client'
import ApplicationListItem from './ApplicationListItem'
import ApplicationForm from './ApplicationForm'
import { Add } from '@material-ui/icons'
import useApps from '../../hooks/app/useApps'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const ApplicationList = () => {
  const [session, loading] = useSession()
  const [showForm, setShowForm] = useState(false)
  const classes = useStyles()

  const { data: applications, error } = useApps(
    { token: session.user.token },
    {
      enabled: !loading,
    }
  )

  return (
    <>
      <List component="div" disablePadding>
        <ListItem
          button
          className={classes.nested}
          onClick={() => setShowForm(true)}
        >
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Nueva Aplicación" />
        </ListItem>

        <Divider />

        {applications?.map((item, idx) => {
          return <ApplicationListItem key={idx} application={item} />
        }) || ''}
      </List>

      <ApplicationForm showForm={showForm} setShowForm={setShowForm} />
    </>
  )
}

export default ApplicationList
