import React, { useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  makeStyles,
} from '@material-ui/core'
import useAppContext from '../AppContext'
import { api } from '../../utils/api'

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

const ChangePasswordForm = () => {
  const classes = useStyles()
  const [showForm, setShowForm] = useState(false)
  const [serverErrors, setServerErrors] = useState([])
  const { setMessage } = useAppContext()

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowForm(true)}
      >
        Cambiar contraseña
      </Button>
      <Dialog
        className={classes.form}
        open={showForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Cambiar contraseña</DialogTitle>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          }}
          validationSchema={Yup.object({
            oldPassword: Yup.string().required('Requerido'),
            newPassword: Yup.string()
              .required('Requerido')
              .min(8, 'Debe tener al menos 8 caracteres'),
            repeatNewPassword: Yup.string().required('Requerido'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(false)
            try {
              if (values.newPassword !== values.repeatNewPassword) {
                setErrors({
                  repeatNewPassword: 'Las contraseñas nuevas no coinciden',
                })
                return false
              }
              await api('/auth/changePassword', {
                method: 'put',
                data: values,
              })
              setSubmitting(false)
              setMessage({
                show: true,
                text: 'Contraseña cambiada con éxito',
                type: 'success',
              })
              setShowForm(false)
            } catch (e) {
              if (e.response.status === 400) {
                setServerErrors(e.response.data.message)
              } else {
                setMessage({
                  show: true,
                  text: 'Ha ocurrido un error',
                  type: 'error',
                })
              }
              return false
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Field
                  className={classes.formControl}
                  component={TextField}
                  name="oldPassword"
                  type="password"
                  label="Contraseña actual"
                />
                <Field
                  className={classes.formControl}
                  component={TextField}
                  name="newPassword"
                  type="password"
                  label="Nueva Contraseña"
                />
                <Field
                  className={classes.formControl}
                  component={TextField}
                  name="repeatNewPassword"
                  type="password"
                  label="Repetir nueva contraseña"
                />
                {serverErrors.length > 0 && (
                  <>
                    {serverErrors.map((item) => (
                      <p key={item} style={{ color: 'red' }}>
                        {item}
                      </p>
                    ))}
                  </>
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

export default ChangePasswordForm
