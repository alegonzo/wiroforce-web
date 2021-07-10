import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CardContent, LinearProgress } from '@material-ui/core';
import LoginLayout from '../../components/layouts/LoginLayout';
import { NextPage } from 'next';
import LoginForm from '../../components/login/LoginForm';
import { useRouter } from 'next/router';
//import { authService } from '../services/AuthService';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://conwiro.com/">
                Conwiro
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 30
    },
}));

// @ts-ignore
const Login: NextPage<Props> = () => {
    const classes = useStyles();
    const router = useRouter();
    const { error } = router.query

    return (
        <LoginLayout title="Wiroforce - Login">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card className={classes.paper}>
                    <CardContent style={{ textAlign: 'center' }}>
                        <Typography component="h1" variant="h5">
                            Login
                    </Typography>
                        <LoginForm />
                        {error && <p style={{ color: 'red' }}>Credenciales incorrectas o cuenta no activa</p>}
                        <Button variant="text" onClick={() => router.push('/signup')}>Crear cuenta</Button>
                    </CardContent>
                </Card>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </LoginLayout>
    );
}

//export const getServerSideProps = getUserFromServerSession({ redirectToLogin: false });

export default Login;