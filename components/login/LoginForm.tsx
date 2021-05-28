import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, makeStyles } from '@material-ui/core';
import { signIn } from 'next-auth/client';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        marginTop: '20px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    }
}));

const LoginForm = () => {
    const classes = useStyles();
    const initialValues = { email: '', password: '' };
    const validationSchema = Yup.object({
        email: Yup.string().email('No es un email valido').required('Requerido'),
        password: Yup.string().required('Requerido')
    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSubmitting(false);
                const handleLogin = () => {
                    signIn('credentials',
                        {
                            ...values,
                            callbackUrl: `${window.location.origin}/wiroforce/dashboard`
                        }
                    )
                }
                handleLogin();
            }}
        >
            {({ submitForm, isSubmitting }) => (
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
                            type="password"
                            label="Password"
                            name="password"
                            fullWidth
                        />
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmitting}
                            onClick={submitForm}>
                            Sign In
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm;