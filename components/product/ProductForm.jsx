import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import {
  PRODUCTS_URL,
  SPECIAL_CHARS_REGEXP,
  SPECIAL_CHARS_REGEXP_NO_SPACE,
} from '../../utils/constants'
import useAppContext from '../AppContext'
import api from '../../utils/api'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  multileFormControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}))

const ProductForm = ({ session, handleCloseForm, edit, product }) => {
  const classes = useStyles()
  const { setMessage } = useAppContext()
  const router = useRouter()
  const { appId } = router.query
  const queryClient = useQueryClient()

  const imageFile = useRef()
  let values = {
    name: '',
    itemId: '',
    price: '',
    description: '',
    resourceAmount: '',
    offline: false,
    appId: appId,
  }
  let formSchema = Yup.object({
    name: Yup.string()
      .required('Requerido')
      .max(25, 'No puede tener más de 25 caracteres')
      .matches(SPECIAL_CHARS_REGEXP, 'No se permiten caracteres especiales'),
    itemId: Yup.string()
      .required('Requerido')
      .max(10, 'No puede tener más de 10 caracteres')
      .matches(
        SPECIAL_CHARS_REGEXP_NO_SPACE,
        'No se permiten caracteres especiales'
      ),
    price: Yup.number()
      .required('Requerido')
      .oneOf([4, 25], 'Deben ser 4 o 25 CUP'),
    description: Yup.string()
      .max(80, 'No puede tener más de 80 caracteres')
      .matches(SPECIAL_CHARS_REGEXP, 'No se permiten caracteres especiales'),
    resourceAmount: Yup.string()
      .required('Requerido')
      .max(45, 'No puede tener más de 45 caracteres'),
    offline: Yup.boolean(),
    appId: Yup.string().required('Falta el id de app'),
  })

  if (product) {
    values = product
    formSchema = Yup.object({
      description: Yup.string()
        .max(80, 'No puede tener más de 80 caracteres')
        .matches(SPECIAL_CHARS_REGEXP, 'No se permiten caracteres especiales'),
      resourceAmount: Yup.string().max(
        45,
        'No puede tener más de 45 caracteres'
      ),
      offline: Yup.boolean(),
    })
  }

  return (
    <Formik
      initialValues={values}
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true)
        const formBody = new FormData()
        for (let key in values) formBody.append(key, values[key])

        if (imageFile?.current?.files?.length > 0)
          formBody.append('image', imageFile.current.files[0])

        let response = ''
        try {
          if (edit) {
            await api().put(`/products/${product.id}`, formBody, {
              headers: { Authorization: 'Bearer ' + session.user.token },
            })
            response = 'Producto Actualizado'
          } else {
            await api().post('/products', formBody, {
              headers: { Authorization: 'Bearer ' + session.user.token },
            })
            response = 'Producto Insertado'
          }
          queryClient.invalidateQueries(PRODUCTS_URL)
          setMessage({
            show: true,
            text: response,
            type: 'success',
          })
          setSubmitting(false)
          handleCloseForm()
        } catch (e) {
          if (e?.response?.status === 400) {
            if (e?.response?.data?.message?.length > 0) {
              setErrors({ serverSide: e?.response?.data?.message[0] })
            } else {
              setErrors(e.response.data?.errors)
            }
          } else if (e.response.status === 413) {
            setErrors({ serverSide: 'Imagen muy grande' })
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
      {({ submitForm, isSubmitting, handleChange, values, errors }) => (
        <DialogContent>
          <Form>
            <div>
              {!edit && (
                <Field
                  className={classes.formControl}
                  component={TextField}
                  name="name"
                  type="text"
                  label="Nombre"
                />
              )}

              {!edit && (
                <Field
                  className={classes.formControl}
                  component={TextField}
                  name="itemId"
                  type="text"
                  label="Id en apk"
                />
              )}

              <FormControl className={classes.formControl}>
                <InputLabel id="price-select">Precio</InputLabel>
                <Select
                  labelId="price-select"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                >
                  <MenuItem value={4}>4 CUP</MenuItem>
                  <MenuItem value={25}>25 CUP</MenuItem>
                </Select>
                {errors && errors?.price ? (
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.price}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Field
                component={TextField}
                className={classes.formControl}
                name="resourceAmount"
                type="text"
                label="Cantidad de Recurso"
              />
            </div>

            <div>
              <Field
                component={TextField}
                name="description"
                variant="outlined"
                multiline
                rows={2}
                type="text"
                label="Descripción"
                style={{ marginTop: 20, width: '100%' }}
              />
            </div>

            <div style={{ marginTop: 20, paddingLeft: 8 }}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="offline"
                Label={{ label: 'Producto Offline' }}
              />
              {values.offline === true && (
                <Alert variant="outlined" severity="warning">
                  Los productos offline no serán actualizados dinámicamente en
                  línea
                </Alert>
              )}
            </div>

            <div style={{ marginTop: 10 }}>
              <InputLabel style={{ marginTop: 30, paddingLeft: 8 }}>
                {!edit ? 'Imagen' : 'Cambiar imagen'}
              </InputLabel>
              <FormControl className={classes.formControl}>
                <input
                  type="file"
                  name="imageFile"
                  ref={imageFile}
                  accept="image/png"
                />
              </FormControl>
              <Typography variant="body2" style={{ paddingLeft: 8 }}>
                Máx. 300 KB/PNG. No es obligatoria
              </Typography>

              {edit && product.imageUrl !== null && (
                <img
                  src={product.imageUrl}
                  style={{
                    height: 100,
                    width: 100,
                    marginTop: 20,
                    borderRadius: 14,
                    marginLeft: 8,
                  }}
                />
              )}
            </div>

            {errors?.serverSide && (
              <Alert variant="outlined" severity="error">
                {errors?.serverSide}
              </Alert>
            )}

            {isSubmitting && <LinearProgress />}

            <DialogActions>
              <Button onClick={handleCloseForm} color="primary">
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
        </DialogContent>
      )}
    </Formik>
  )
}

export default ProductForm
