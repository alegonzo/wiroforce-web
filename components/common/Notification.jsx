import { Snackbar } from '@material-ui/core'
import React from 'react'
import useAppContext from '../AppContext'
import Alert from '@material-ui/lab/Alert'

const Notification = () => {
  const { message, setMessage } = useAppContext()

  const handleClose = () => {
    setMessage({
      ...message,
      show: false,
      text: '',
    })
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={message.show}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert variant="filled" onClose={handleClose} severity={message.type}>
        {message.text}
      </Alert>
    </Snackbar>
  )
}

export default Notification
