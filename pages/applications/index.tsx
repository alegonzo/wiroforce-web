import React, { useEffect, useRef, useState } from 'react';
import { LinearProgress, Breadcrumbs, Button, Container, Dialog, DialogTitle, Grid, IconButton, Snackbar, Typography, makeStyles } from '@material-ui/core';
import LoaderBar from '../../components/generic/LoaderBar';
import { Close } from '@material-ui/icons';
import Api from '../../utils/api';
import ApplicationList from '../../components/application/ApplicationList';
import ApplicationForm from '../../components/application/ApplicationForm';
import Layout from '../../components/layouts/Layout';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

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

const Applications = ({ session }) => {
    const classes = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [applications, setApplications] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Aplicacion insertada!!!');

    useEffect(() => {
        getApplications();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const handleCloseModal = () => {
        setShowForm(!showForm)
    }

    const getApplications = async () => {
        setLoading(true);
        try {
            const response = await Api().get('/applications', {
                //@ts-ignore
                headers: { 'Authorization': 'Bearer ' + session.user.token }
            });
            setApplications(response.data);
        } catch (e) {
            setToastMessage(e.message);
            setOpenToast(true);
        }
        setLoading(false);
    }

    if (!loading) {
        return (
            <Layout title="Aplicaciones">
                <Container>
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20, marginTop: 20 }}>
                        <Button variant="text" onClick={() => router.push('/')}>
                            Dashboard
                    </Button>
                        <Typography color="textPrimary">Aplicaciones</Typography>
                    </Breadcrumbs>
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>
                        Registrar Aplicación
                    </Button>
                    <Dialog className={classes.form} open={showForm} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Registrar Aplicación</DialogTitle>
                        <ApplicationForm
                            handleCloseForm={handleCloseModal}
                            setShowForm={setShowForm}
                            getApplications={getApplications}
                            setToastMessage={setToastMessage}
                            setOpenToast={setOpenToast} />
                    </Dialog>
                    <ApplicationList applications={applications} />
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
                </Container >
            </Layout>
        );
    }
    return (
        <LoaderBar />
    );
}


export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session)
        return { props: { session } }
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    }
}

export default Applications;