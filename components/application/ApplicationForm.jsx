import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, DialogActions, DialogContent, FormControl, LinearProgress, makeStyles } from '@material-ui/core';
import Api from '../../utils/api';
import { useSession } from 'next-auth/client';

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
    },
    input: {
        margin: theme.spacing(1),
    }
}));

const ApplicationForm = ({ handleCloseForm, setShowForm, getApplications, setToastMessage, setOpenToast }) => {
    const classes = useStyles();
    const [session] = useSession();
    const imageFile = useRef();

    return (
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
                    setToastMessage('Aplicacion insertada');
                    setOpenToast(true);
                    await getApplications();
                    setShowForm(false);
                } catch (e) {
                    setToastMessage('Ha ocurrido un error');
                    setOpenToast(true);
                    if(e.response.status === 400)
                        setErrors({name: e.response.data.message});
                    if(e.response.status === 401)
                        router.push('/login')
                    
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
                        <Button onClick={handleCloseForm} color="primary">
                            Cancelar
                        </Button>
                        <Button disabled={isSubmitting} onClick={submitForm} color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik >
    );
}

export default ApplicationForm;