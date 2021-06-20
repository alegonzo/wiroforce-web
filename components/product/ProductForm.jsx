import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, DialogActions, DialogContent, FormControl, FormHelperText, InputLabel, LinearProgress, MenuItem, Select } from '@material-ui/core';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import Api from '../../utils/api';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    multileFormControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
}));

const ProductForm = ({ session, handleSubmit, handleCloseForm, appId, edit, product }) => {
    const router = useRouter();
    const classes = useStyles();
    const imageFile = useRef();
    let values = {
        name: '',
        itemId: '',
        price: '',
        description: '',
        resourceAmount: '',
        offline: false,
        appId: appId
    };
    let formSchema = Yup.object({
        name: Yup.string().required('Requerido'),
        itemId: Yup.string().required('Requerido'),
        price: Yup.number().required('Requerido').oneOf([4, 25], 'Deben ser 4 o 25 CUP'),
        description: Yup.string(),
        resourceAmount: Yup.string().required('Requerido'),
        offline: Yup.boolean(),
        appId: Yup.string().required('Falta el id de app')
    });
    if (product) {
        values = product;
        formSchema = Yup.object({
            //price: Yup.number().required('Requerido').oneOf([4, 25], 'Deben ser 4 o 25 CUP'),
            description: Yup.string(),
            resourceAmount: Yup.string(),
            offline: Yup.boolean()
        });
    }

    return (
        <Formik
            initialValues={values}
            validationSchema={formSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSubmitting(true);
                const formBody = new FormData();
                for (let key in values)
                    formBody.append(key, values[key]);
                if (imageFile.current.files.length > 0)
                    formBody.append('image', imageFile.current.files[0]);

                let response = '';
                try {
                    if (edit) {
                        await Api().put(`/products/${product.id}`, formBody, {
                            headers: { 'Authorization': 'Bearer ' + session.user.token }
                        });
                        response = "Producto Actualizado";
                    } else {
                        await Api().post('/products', formBody, {
                            headers: { 'Authorization': 'Bearer ' + session.user.token }
                        });
                        response = "Producto Insertado";
                    }
                    setSubmitting(false);
                    await handleSubmit(response);
                } catch (e) {
                    if (e.response.status === 400) {
                        setSubmitting(false);
                        setErrors(e.response.data.errors);
                    }
                    if (e.response.status === 401)
                        router.push('/login');
                    return false;
                }
            }}
        >
            {({ submitForm, isSubmitting, handleChange, values, errors }) => (
                <DialogContent>
                    <Form>
                        <div>
                            {!edit && <Field
                                className={classes.formControl}
                                component={TextField}
                                name="name"
                                type="text"
                                label="Nombre"
                            />}
                            {!edit && <Field
                                className={classes.formControl}
                                component={TextField}
                                name="itemId"
                                type="text"
                                label="Id en apk"
                            />}
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
                                {errors && errors.price ? <FormHelperText style={{ color: 'red' }}>{errors.price}</FormHelperText> : null}
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
                                label="Descripcion"
                                style={{ marginTop: 20, width: '100%' }}
                            />
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Field
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="offline"
                                Label={{ label: 'Producto Offline' }}
                            />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <FormControl className={classes.formControl}>
                                <input type="file" name="imageFile" ref={imageFile} />
                            </FormControl>
                        </div>
                        {isSubmitting && <LinearProgress />}
                        <DialogActions>
                            <Button onClick={handleCloseForm} color="primary">
                                Cancelar
                                </Button>
                            <Button disabled={isSubmitting} onClick={submitForm} color="primary">
                                Guardar
                            </Button>
                        </DialogActions>
                    </Form>
                </DialogContent>
            )}
        </Formik>
    );
}

export default ProductForm;