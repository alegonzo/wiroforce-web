import React, { useEffect, useState } from 'react'
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
import useAppContext from '../AppContext'

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const ApplicationList = () => {
  const [session] = useSession()
  const { setMessage } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const classes = useStyles()

  const { data: applications, error } = useApps()

  useEffect(() => {
    if (error?.message)
      setMessage({
        show: true,
        text: 'Ha ocurrido un error',
        type: 'error',
      })
  }, [error])

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

      {applications && (
        <ApplicationForm
          showForm={showForm}
          setShowForm={setShowForm}
          paid={
            applications?.length >= 2 &&
            session?.user.company.name !== 'Conwiro'
          }
        />
      )}
    </>
  )
}

export default ApplicationList
