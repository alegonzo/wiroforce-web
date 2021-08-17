import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import {
  Button,
  FormControl,
  Typography,
  FormHelperText,
  MenuItem,
  InputLabel,
  makeStyles,
  Select,
  Grid,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import axios from 'axios'
import { useQueryClient } from 'react-query'
import { USER_URL } from '../../utils/constants'
import useAppContext from '../AppContext'
import api from '../../utils/api'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 300,
  },
}))

const provinces = [
  'Pinar del Río',
  'Artemisa',
  'La Habana',
  'Mayabeque',
  'Matanzas',
  'Cienfuegos',
  'Villa Clara',
  'Sancti Spíritus',
  'Ciego de Ávila',
  'Camagüey',
  'Las Tunas',
  'Holguín',
  'Granma',
  'Santiago de Cuba',
  'Guantánamo',
  'Isla de la Juventud',
]

const ProfileForm = ({ edit, user, setEdit, setShowDialog }) => {
  const router = useRouter()
  const [session] = useSession()
  const classes = useStyles()
  const queryClient = useQueryClient()
  const { setMessage } = useAppContext()

  const initialValues = edit
    ? {
        phone: user?.profile?.phone ? user?.profile?.phone : '',
        address: user?.profile?.address ? user?.profile?.address : '',
        province: user?.profile?.province ? user?.profile?.province : '',
        nitOnat: user?.profile?.nitOnat ? user?.profile?.nitOnat : '',
        bankCard: user?.profile?.bankCard ? user?.profile?.bankCard : '',
      }
    : {
        fullName: '',
        email: '',
        password: '',
        checkPassword: '',
        company: '',
      }
  const validationSchema = edit
    ? Yup.object({
        //password: Yup.string().required('Requerido'),
        //checkPassword: Yup.string(),
        phone: Yup.string().matches(
          /^[0-9]{8}$/,
          'Debe cumplir con el formato de número de teléfono'
        ),
        address: Yup.string().max(80, 'No puede tener más de 80 caracteres'),
        province: Yup.string().oneOf(provinces),
        nitOnat: Yup.string(),
        bankCard: Yup.string().matches(
          /^[0-9]{16}$/,
          'Debe cumplir con el formato de número de tarjeta'
        ),
      })
    : Yup.object({
        fullName: Yup.string()
          .required('Requerido')
          .length(100, 'No puede tener más de 100 caracteres'),
        email: Yup.string()
          .email('No es un email válido')
          .length(30, 'No puede tener más de 100 caracteres')
          .required('Requerido'),
        password: Yup.string()
          .required('Requerido')
          .min(8, 'Debe tener al menos 8 caracteres'),
        checkPassword: Yup.string().required('Requerido'),
        company: Yup.string()
          .required('Requerido')
          .length(30, 'No puede tener más de 30 caracteres'),
      })
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(false)
        if (!edit && values.password !== values.checkPassword) {
          setErrors({
            checkPassword: 'Las contraseñas no coinciden',
          })
          return false
        }
        try {
          if (edit) {
            await api().put(`/users/editProfile`, values, {
              headers: {
                Authorization: 'Bearer ' + session.user.token,
              },
            })
            queryClient.invalidateQueries(USER_URL)
            setMessage({
              show: true,
              text: 'Perfil Editado',
            })
            setEdit(false)
          } else {
            await axios.post(
              `https://conwiro.nat.cu/wiroforce-api/api/v1/auth/signup`,
              values
            )
            setShowDialog(true)
          }
        } catch (e) {
          if (e.response.status === 400) {
            setErrors({ serverSide: e.response.data.message })
          } else {
            setMessage({
              show: true,
              text: 'Ha ocurrido un error',
            })
          }
          return false
        }
      }}
    >
      {({ submitForm, isSubmitting, values, handleChange, errors }) => (
        <Form className={classes.form}>
          {edit && (
            <Typography variant="h6" gutterBottom component="div">
              Editar Perfil
            </Typography>
          )}
          <div>
            {!edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
              />
            )}
          </div>
          <div>
            <Field
              className={classes.formControl}
              component={TextField}
              name="fullName"
              type="text"
              label="Nombre Completo"
              fullWidth
            />
          </div>
          <div>
            {!edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                name="company"
                type="text"
                label="Nombre del Estudio"
                fullWidth
              />
            )}
          </div>
          <div>
            {edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                name="phone"
                type="text"
                label="Telefono"
                fullWidth
              />
            )}
          </div>
          <div>
            {edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                name="address"
                type="text"
                label="Direccion"
                fullWidth
              />
            )}
          </div>
          <div>
            {edit && (
              <FormControl
                className={classes.formControl}
                style={{ width: '100%' }}
              >
                <InputLabel id="province-select">Provincia</InputLabel>
                <Select
                  labelId="province-select"
                  id="province"
                  name="province"
                  value={values.province}
                  onChange={handleChange}
                >
                  <MenuItem value="" key="">
                    Ninguno
                  </MenuItem>
                  {provinces.map((item, idx) => (
                    <MenuItem value={item} key={idx}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {errors.price ? (
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.price}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          </div>
          <div>
            {edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                name="nitOnat"
                type="text"
                label="NIT ONAT"
                fullWidth
              />
            )}
          </div>
          <div>
            {edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                name="bankCard"
                type="text"
                label="Tarjeta de Banco (CUP)"
                fullWidth
              />
            )}
          </div>
          <div>
            {!edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                type="password"
                label="Password"
                name="password"
                fullWidth
              />
            )}
          </div>
          <div>
            {!edit && (
              <Field
                className={classes.formControl}
                component={TextField}
                type="password"
                label="Repetir Contraseña"
                name="checkPassword"
                fullWidth
              />
            )}
          </div>
          <br />
          <div style={{ color: 'red' }}>
            {errors.serverSide &&
              errors.serverSide.map((item, idx) => (
                <Typography key={idx} variant="body1">
                  {item}
                </Typography>
              ))}
          </div>

          <br />

          <Grid container justifyContent="space-evenly">
            <Button
              fullWidth={!edit}
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
              onClick={submitForm}
            >
              {edit ? 'Guardar' : 'Crear cuenta'}
            </Button>

            <Button
              fullWidth={!edit}
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => {
                if (edit) setEdit(false)
                else router.push('/login')
              }}
            >
              Cancelar
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

ProfileForm.protoTypes = {
  edit: PropTypes.any,
}

export default ProfileForm
