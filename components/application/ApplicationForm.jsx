import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, LinearProgress, makeStyles, Snackbar } from '@material-ui/core';
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

const ApplicationForm = ({ showForm, setShowForm, callback }) => {
    const classes = useStyles();
    const [session] = useSession();
    const imageFile = useRef();
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Aplicacion insertada!!!');

    const handleClose = (event, reason) => {
        setOpenToast(false);
    };

    return (
        <>
            <Dialog className={classes.form} open={showForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Registrar Aplicación</DialogTitle>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object({ name: Yup.string().required('Requerido') })}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        const formBody = new FormData();
                        for (let key in values) {
                            formBody.append(key, values[key]);
                        }
                        if (imageFile.current.files.length > 0) {
                            formBody.append('image', imageFile.current.files[0]);
                        } else {
                            return false;
                        }
                        try {
                            await Api().post('/applications', formBody, {
                                headers: { 'Authorization': 'Bearer ' + session.user.token }
                            });
                            setSubmitting(false);
                            setToastMessage('Aplicación insertada');
                            setOpenToast(true);
                            await callback();
                            setShowForm(false);
                        } catch (e) {
                            setToastMessage('Ha ocurrido un error');
                            setOpenToast(true);
                            if (e.response.status === 400)
                                setErrors({ name: e.response.data.message });
                            if (e.response.status === 401)
                                signOut()
                            return false;
                        }
                    }}>
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
                                    <FormControl className={classes.formControl}>
                                        <input type="file" name="imageFile" ref={imageFile} className={classes.formControl} />
                                    </FormControl>
                                </div>
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

export default ApplicationForm;