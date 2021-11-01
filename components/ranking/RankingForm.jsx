import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  DialogActions,
  DialogContent,
  LinearProgress,
} from '@material-ui/core'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import {
  RANKINGS_URL,
  SPECIAL_CHARS_REGEXP_NO_SPACE,
} from '../../utils/constants'
import useAppContext from '../AppContext'
import Alert from '@material-ui/lab/Alert'
import { api } from '../../utils/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  multileFormControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}))

const RankingForm = ({ handleCloseForm, edit, ranking }) => {
  const classes = useStyles()
  const { setMessage } = useAppContext()
  const router = useRouter()
  const { appId: applicationId } = router.query
  const queryClient = useQueryClient()

  let values = !ranking
    ? {
        name: '',
        description: '',
        applicationId: applicationId,
        static: true,
        price: '',
      }
    : ranking
  let formSchema = Yup.object({
    name: Yup.string()
      .required('Requerido')
      .max(25, 'No puede tener más de 25 caracteres')
      .matches(
        SPECIAL_CHARS_REGEXP_NO_SPACE,
        'No se permiten caracteres especiales'
      ),
    description: Yup.string().max(200, 'No puede tener más de 200 caracteres'),
    price: Yup.string().max(200, 'No puede tener más de 200 caracteres'),
  })

  return (
    <Formik
      initialValues={values}
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true)

        let response = ''
        try {
          if (edit) {
            await api(RANKINGS_URL, {
              method: 'put',
              data: values,
            })
            response = 'Ranking Actualizado'
          } else {
            await api(RANKINGS_URL, {
              method: 'post',
              data: values,
            })
            response = 'Ranking Insertado'
          }
          queryClient.invalidateQueries(RANKINGS_URL)
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
      {({ submitForm, isSubmitting, values, errors }) => (
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

            <div>
              <Field
                component={TextField}
                name="price"
                variant="outlined"
                multiline
                rows={2}
                type="text"
                label="Premio"
                style={{ marginTop: 20, width: '100%' }}
              />
            </div>

            <div style={{ marginTop: 20, paddingLeft: 8 }}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name=""
                Label={{ label: 'Fijo' }}
              />
              {values.offline === true && (
                <Alert variant="outlined" severity="warning"></Alert>
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

export default RankingForm
