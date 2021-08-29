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
  InputLabel,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useSession } from 'next-auth/client'
import { APPLICATIONS_URL, SPECIAL_CHARS_REGEXP } from '../../utils/constants'
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
    minWidth: 500,
  },
}))

const ApplicationForm = ({ showForm, setShowForm, paid }) => {
  const classes = useStyles()
  const queryClient = useQueryClient()
  const [session] = useSession()
  const { setMessage } = useAppContext()
  const imageFile = useRef()
  const receiptFile = useRef()

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
              .max(30, 'No puede tener más de 30 caracteres')
              .matches(
                SPECIAL_CHARS_REGEXP,
                'No se permiten caracteres especiales'
              ),
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
            if (paid === true) {
              if (receiptFile.current.files.length > 0) {
                formBody.append('receipt', receiptFile.current.files[0])
              } else {
                return false
              }
            }
            try {
              await api().post(APPLICATIONS_URL, formBody, {
                headers: { Authorization: 'Bearer ' + session.user.token },
              })
              setSubmitting(false)
              setMessage({
                show: true,
                text: 'Aplicación creada',
                type: 'success',
              })
              queryClient.invalidateQueries(APPLICATIONS_URL)
              setShowForm(false)
            } catch (e) {
              if (e.response.status === 400) {
                setErrors({ name: e.response.data.message })
                setSubmitting(false)
              } else if (e.response.status === 413) {
                setErrors({ serverSide: 'Imagen muy grande' })
              } else {
                setMessage({
                  show: true,
                  text: 'Ha ocurrido un error',
                  type: 'error',
                })
              }
            }
          }}
        >
          {({ errors, submitForm, isSubmitting }) => (
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
                  <InputLabel style={{ marginTop: 30 }}>Icono</InputLabel>
                  <FormControl>
                    <input
                      type="file"
                      name="imageFile"
                      ref={imageFile}
                      accept="image/png,image/jpg,image/jpeg"
                      style={{ marginTop: 10 }}
                    />
                  </FormControl>
                </div>
                <br />
                {paid && (
                  <>
                    <Divider />
                    <br />

                    <Typography>Información de pago</Typography>
                    <Alert variant="outlined" severity="warning">
                      Ha excedido el límite de 2 aplicaciones gratis. Debe
                      abonar la cantidad de 400 CUP a través de la función de QR
                      de ENZONA para registrar la aplicación. Luego de realizar
                      la comprobación por parte del equipo de soporte se
                      procederá a su activación y estará disponible en la lista
                      de aplicaciones
                    </Alert>

                    <div style={{ marginTop: 20 }}>
                      <QRCode
                        value={'051fab4770b0b84f91b3091eb76073d8ab'}
                        size={180}
                        bgColor="#282c34"
                        fgColor="#fff"
                        level="H"
                      />
                      <InputLabel style={{ marginTop: 30 }}>
                        Subir captura de pantalla de ENZONA de confirmación de
                        pago
                      </InputLabel>
                      <FormControl>
                        <input
                          type="file"
                          name="receiptFile"
                          ref={receiptFile}
                          accept="image/png,image/jpg,image/jpeg"
                          style={{ marginTop: 10 }}
                        />
                      </FormControl>
                    </div>
                  </>
                )}

                {errors.serverSide && (
                  <Alert variant="outlined" severity="error">
                    {errors.serverSide}
                  </Alert>
                )}

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
