import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CardContent, LinearProgress } from '@material-ui/core';
import LoginLayout from '../../components/layouts/LoginLayout';
import SignupForm from '../../components/user/SignupForm';
import { NextPage } from 'next';
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
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));

const SignupPage: NextPage<Props> = () => {
    const classes = useStyles();

    useEffect(() => {
        //mandar pal dashboard si esta logueado
    });

    return (
        <LoginLayout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card className={classes.paper}>
                    <CardContent>
                        <Typography component="h1" variant="h5">
                            Crear cuenta
                        </Typography>
                        <SignupForm />
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

export default SignupPage;