import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'
import { useSession } from 'next-auth/client'

export default function ApplicationReceipt({ url = null }) {
  const [open, setOpen] = React.useState(false)
  const [session] = useSession()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  /* const getReceiptImg = async () => {
      const
  }*/

  if (url && session) {
    return (
      <div>
        <Button color="primary" onClick={handleClickOpen}>
          Ver Recibo
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <img style={{ width: '100%', height: '100%' }} src={url} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  return <Typography>-</Typography>
}
