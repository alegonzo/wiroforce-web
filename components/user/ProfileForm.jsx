import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import {
    Button,
    FormControl,
    Typography,
    FormHelperText,
    MenuItem,
    InputLabel,
    makeStyles,
    Select,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Api from "../../utils/api";
import { useSession } from "next-auth/client";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 300,
    },
}));

const provinces = ['Pinar del Río', 'Artemisa', 'La Habana', 'Mayabeque',
    'Matanzas', 'Cienfuegos', 'Villa Clara', 'Sancti Spíritus', 'Ciego de Ávila',
    'Camagüey', 'Las Tunas', 'Holguín', 'Granma', 'Santiago de Cuba', 'Guantánamo', 'Isla de la Juventud'];

const ProfileForm = ({ edit, user, setEdit, updateProfile, setShowDialog }) => {
    const router = useRouter();
    const [session] = useSession();
    const classes = useStyles();

    const initialValues = edit
        ? user
        : {
            fullName: "",
            email: "",
            password: "",
            checkPassword: "",
            company: "",
        };
    const validationSchema = edit
        ? Yup.object({
            //password: Yup.string().required('Requerido'),
            checkPassword: Yup.string(),
            fullName: Yup.string(),
            phone: Yup.string(),
            address: Yup.string(),
            province: Yup.string(),
            nitOnat: Yup.string(),
        })
        : Yup.object({
            fullName: Yup.string().required("Requerido"),
            email: Yup.string()
                .email("No es un email valido")
                .required("Requerido"),
            password: Yup.string().required("Requerido"),
            checkPassword: Yup.string().required("Requerido"),
            company: Yup.string().required("Requerido"),
        });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSubmitting(false);
                if (!edit && values.password !== values.checkPassword) {
                    setErrors({
                        checkPassword: "Las contraseñas no coinciden",
                    });
                    return false;
                }
                try {
                    if (!edit) {
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
                            values
                        );
                        setShowDialog(true);
                    } else {
                        const response = await Api().put(
                            `/users/editProfile`,
                            values,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + session.user.token,
                                },
                            }
                        );
                        await updateProfile();
                        setEdit(false);
                    }
                } catch (e) {
                    console.log(e.message);
                    if (e.response.status === 400)
                        setErrors({ serverSide: e.response.data.message });
                    if (e.response.status === 401) router.push("/login");
                    return false;
                }
            }}
        >
            {({ submitForm, isSubmitting, values, handleChange, errors }) => (
                <Form className={classes.form}>
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
                                style={{ width: "100%" }}
                            >
                                <InputLabel id="province-select">
                                    Provincia
                                </InputLabel>
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
                                    {provinces.map((item, idx) => <MenuItem value={item} key={idx}>
                                        {item}
                                    </MenuItem>)}
                                </Select>
                                {errors.price ? (
                                    <FormHelperText style={{ color: "red" }}>
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
                    <div style={{ color: "red" }}>
                        {errors.serverSide &&
                            errors.serverSide.map((item, idx) => (
                                <Typography key={idx} variant="body1">
                                    {item}
                                </Typography>
                            ))}
                    </div>
                    <br />
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            {edit ? "Guardar" : "Crear cuenta"}
                        </Button>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => {
                                if (edit) setEdit(false);
                                else router.push("/login");
                            }}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

ProfileForm.protoTypes = {
    edit: PropTypes.any,
};

export default ProfileForm;
