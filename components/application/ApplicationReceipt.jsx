import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'
import { useSession } from 'next-auth/client'
import useReceipt from '../../hooks/app/useReceipt'
import useAppContext from '../AppContext'

export default function ApplicationReceipt({ application }) {
  const [open, setOpen] = React.useState(false)
  const { setMessage } = useAppContext()
  const [image, setImage] = useState(null)
  const [session] = useSession()
  const { data: receipt, error } = useReceipt(application.id, {
    enabled: session && application.receiptUrl !== null,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (error?.message)
      setMessage({
        show: true,
        text: 'Ha ocurrido un error',
        type: 'error',
      })
  }, [error])

  useEffect(() => {
    const handleImage = () => {
      if (receipt) setImage(URL.createObjectURL(receipt))
    }
    handleImage()
  }, [receipt])

  if (session && application.receiptUrl !== null) {
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
          <DialogTitle id="alert-dialog-title">Recibo</DialogTitle>
          <DialogContent>
            {image !== null && (
              <img
                style={{ width: '100%', height: '100%', borderRadius: 14 }}
                src={image}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  return <Typography>-</Typography>
}
