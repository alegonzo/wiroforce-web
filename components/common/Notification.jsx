import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import useAppContext from '../AppContext'

const Notification = () => {
  const { message, setMessage } = useAppContext()

  const handleClose = () => {
    setMessage({
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
      message={message.text}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    />
  )
}

export default Notification
