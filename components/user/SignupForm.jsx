import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, FormControl, Typography, FormHelperText, MenuItem, InputLabel, makeStyles, Select } from '@material-ui/core';
import { useRouter } from 'next/router';
import Api from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        marginTop: theme.spacing(3)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        marginTop: '20px'
    },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 300,
    }
}));

const SignupForm = () => {
    const classes = useStyles();
    const router = useRouter();
    const initialValues = {
        email: '',
        password: '',
        fullName: '',
        company: '',
        phone: '',
        address: '',
        province: 'La Habana',
        nitOnat: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('No es un email valido').required('Requerido'),
        password: Yup.string().required('Requerido'),
        fullName: Yup.string().required('Requerido'),
        company: Yup.string().required('Requerido'),
        phone: Yup.string().required('Requerido'),
        address: Yup.string().required('Requerido'),
        province: Yup.string().required('Requerido'),
        nitOnat: Yup.string().required('Requerido')
    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSubmitting(false);
                try {
                    const response = await Api().post('/auth/signup', values);
                } catch (e) {
                    console.log(e.response.data);
                    setErrors({
                        serverSide: e.response.data.message
                    })
                    return false;
                }
                router.push('/login');
            }}
        >
            {({ submitForm, isSubmitting, values, handleChange, errors }) => (
                <Form className={classes.form}>
                    <div>
                        <Field
                            className={classes.formControl}
                            component={TextField}
                            name="email"
                            type="email"
                            label="Email"
                            fullWidth
                        />
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
                        <Field
                            className={classes.formControl}
                            component={TextField}
                            name="company"
                            type="text"
                            label="Estudio"
                            fullWidth
                        />
                    </div>
                    <div>
                        <Field
                            className={classes.formControl}
                            component={TextField}
                            name="phone"
                            type="text"
                            label="Telefono"
                            fullWidth
                        />
                    </div>
                    <div>
                        <Field
                            className={classes.formControl}
                            component={TextField}
                            name="address"
                            type="text"
                            label="Direccion"
                            fullWidth
                        />
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="province-select">Provincia</InputLabel>
                            <Select
                                labelId="province-select"
                                id="province"
                                name="province"
                                value={values.province}
                                onChange={handleChange}
                            >
                                <MenuItem value="La Habana">La Habana</MenuItem>
                            </Select>
                            {errors.price ? <FormHelperText style={{ color: 'red' }}>{errors.price}</FormHelperText> : null}
                        </FormControl>
                    </div>
                    <div>
                        <Field
                            className={classes.formControl}
                            component={TextField}
                            name="nitOnat"
                            type="text"
                            label="NIT ONAT"
                            fullWidth
                        />
                    </div>
                    <div>
                        <Field
                            className={classes.formControl}
                            component={TextField}
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth
                        />
                    </div>
                    <br />
                    <div style={{ color: 'red' }}>
                        {
                            errors.serverSide && errors.serverSide.map((item, idx) => <Typography variant="body1">-{item}</Typography>)
                        }
                    </div>
                    <br />
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting}
                            onClick={submitForm}>
                            Crear cuenta
                        </Button>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => router.push('/login')}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SignupForm;