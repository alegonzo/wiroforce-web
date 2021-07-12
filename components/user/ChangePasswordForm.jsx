import React, { useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, makeStyles, Snackbar } from '@material-ui/core';
import Api from '../../utils/api';
import { signOut, useSession } from 'next-auth/client';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        minWidth: 500
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
    }
}));

const ChangePasswordForm = () => {
    const classes = useStyles();
    const [session] = useSession();
    const [showForm, setShowForm] = useState(false)
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [serverErrors, setServerErrors] = useState([])

    const handleClose = (event, reason) => {
        setOpenToast(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: 20 }}
                onClick={() => setShowForm(true)}
            >
                Cambiar contraseña
            </Button>
            <Dialog className={classes.form} open={showForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cambiar contraseña</DialogTitle>
                <Formik
                    initialValues={{ oldPassowrd: '', newPassword: '', repeatNewPassword: '' }}
                    validationSchema={Yup.object({
                        oldPassword: Yup.string().required('Requerido'),
                        newPassword: Yup.string().required('Requerido'),
                        repeatNewPassword: Yup.string().required('Requerido')
                    })}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        console.log(values)
                        setSubmitting(false);
                        try {
                            if (values.newPassword !== values.repeatNewPassword) {
                                setErrors({ repeatNewPassword: 'Las contraseñas nuevas no coinciden' })
                                return false
                            }
                            const response = await Api().put('/auth/changePassword', values, {
                                headers: { 'Authorization': 'Bearer ' + session.user.token }
                            });
                            setSubmitting(false);
                            setToastMessage(response.data.message);
                            setOpenToast(true);
                            setShowForm(false);
                        } catch (e) {
                            setToastMessage('Ha ocurrido un error');
                            if (e.response.status === 400)
                                setServerErrors(e.response.data.message)
                            if (e.response.status === 401) {
                                setOpenToast(true);
                                signOut()
                            }
                            return false;
                        } finally {
                            setSubmitting(false)
                        }
                    }}>
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
                                {serverErrors.length > 0 && <>
                                    {serverErrors.map(item => <p style={{ color: 'red' }}>{item}</p>)}
                                </>}
                                {isSubmitting && <LinearProgress />}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setShowForm(false)} color="primary">
                                    Cancelar
                                </Button>
                                <Button disabled={isSubmitting} onClick={submitForm} color="primary">
                                    Guardar
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik >
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openToast}
                autoHideDuration={6000}
                onClose={handleClose}
                message={toastMessage}
                action={
                    <>
                        {/* @ts-ignore */}
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <Close fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </>
    );
}

export default ChangePasswordForm;