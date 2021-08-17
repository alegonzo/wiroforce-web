import React, { useRef } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { useSession } from 'next-auth/client'
import { APPLICATIONS_URL } from '../../utils/constants'
import api from '../../utils/api'
import useAppContext from '../AppContext'
import { useQueryClient } from 'react-query'
import QRCode from 'react-qr-code'

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    minWidth: 500,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
}))

const ApplicationForm = ({ showForm, setShowForm }) => {
  const classes = useStyles()
  const queryClient = useQueryClient()
  const [session] = useSession()
  const { setMessage } = useAppContext()
  const imageFile = useRef()

  return (
    <>
      <Dialog
        className={classes.form}
        open={showForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrar Aplicación</DialogTitle>

        <Formik
          initialValues={{ name: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Requerido')
              .max(30, 'No puede tener más de 30 caracteres'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const formBody = new FormData()
            for (let key in values) {
              formBody.append(key, values[key])
            }
            if (imageFile.current.files.length > 0) {
              formBody.append('image', imageFile.current.files[0])
            } else {
              return false
            }
            try {
              await api().post(APPLICATIONS_URL, formBody, {
                headers: { Authorization: 'Bearer ' + session.user.token },
              })
              setSubmitting(false)
              setMessage({
                show: true,
                text: 'Aplicación creada',
              })
              queryClient.invalidateQueries(APPLICATIONS_URL)
              setShowForm(false)
            } catch (e) {
              if (e.response.status === 400) {
                setErrors({ name: e.response.data.message })
                setSubmitting(false)
              } else {
                setMessage({
                  show: true,
                  text: 'Ha ocurrido un error',
                })
              }
            }
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Field
                  className={classes.formControl}
                  component={TextField}
                  name="name"
                  type="name"
                  label="Nombre"
                />

                <div>
                  <InputLabel style={{ marginTop: 30, paddingLeft: 10 }}>
                    Icono
                  </InputLabel>
                  <FormControl>
                    <input
                      type="file"
                      name="imageFile"
                      ref={imageFile}
                      className={classes.formControl}
                    />
                  </FormControl>
                </div>

                {/*<br />
                <Divider />
                <br />

                <Typography>Información de pago</Typography>
                <Grid
                  container
                  justifyContent="space-between"
                  style={{ paddingTop: 30 }}
                >
                  <QRCode
                    value={'055940b9f56a914f3286e2d4ffff013b50'}
                    size={180}
                    bgColor="#282c34"
                    fgColor="#fff"
                    level="H"
                  />
                  <Grid>
                    <Typography>Cantidad a pagar</Typography>
                    <Typography>500 CUP</Typography>
                  </Grid>
                </Grid>*/}
                {isSubmitting && <LinearProgress />}
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setShowForm(false)} color="primary">
                  Cancelar
                </Button>
                <Button
                  disabled={isSubmitting}
                  onClick={submitForm}
                  color="primary"
                >
                  Guardar
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

export default ApplicationForm
