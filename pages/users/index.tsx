import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Typography, Button, Container, Dialog, DialogTitle, Grid, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import LoaderBar from '../../components/generic/LoaderBar';
import Api from '../../utils/api';
import { Close } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/client';
import Layout from '../../components/layouts/Layout';
import UsersTable from '../../components/user/UsersTable';

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        minWidth: 900
    }
}));

const Users = ({ session }) => {
    const router = useRouter();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Usuario insertado!!!');
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const updateActiveUser = async (id, active) => {
        try {
            const response = await Api().put(`/users/${id}/updateStatus`, { active: !active }, {
                headers: {
                    'Authorization': 'Bearer ' + session.user.token
                }
            });
            let updatedList = users.map(item => {
                if (item.id === id) {
                    return { ...item, active: response.data.active };
                }
                return item;
            });
            setUsers(updatedList);
        } catch (e) {
            setToastMessage(e.message);
            setOpenToast(true);
            if (e.response.status === 401)
                signOut()
        }
    }

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await Api().get(`/users`, {
                headers: { 'Authorization': 'Bearer ' + session.user.token },
                params: { page: page, size: size }
            });
            setUsers(response.data);
        } catch (e) {
            setToastMessage(e.message);
            setOpenToast(true);
            if (e.response.status === 401)
                signOut()
        }
        setLoading(false);
    }

    return (
        <Layout title={`Usuarios`}>
            <Grid container spacing={3} style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20, marginTop: 20 }}>
                        <Button variant="text" onClick={() => router.push('/dashboard')}>
                            Dashboard
                            </Button>
                        <Typography color="textPrimary">Usuarios</Typography>
                    </Breadcrumbs>
                    {users ? <UsersTable
                        users={users}
                        updateActiveUser={updateActiveUser}
                    /> : <LoaderBar />}

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
                            <React.Fragment>
                                {/*@ts-ignore*/}
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    <Close fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </Grid>
            </Grid>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return { props: { session } }
    }
    return {
        redirect: { destination: '/login', permanent: false, },
    }
}

export default Users;