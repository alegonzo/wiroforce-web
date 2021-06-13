import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Typography, Button, Container, Dialog, DialogTitle, Grid, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import LoaderBar from '../../../components/generic/LoaderBar';
import Api from '../../../utils/api';
import { Close } from '@material-ui/icons';
import ProductTable from '../../../components/product/ProductTable';
import ProductForm from '../../../components/product/ProductForm';
import Layout from '../../../components/layouts/Layout';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        minWidth: 900
    }
}));

const Products = ({ session }) => {
    const router = useRouter();
    const classes = useStyles();
    const { appId } = router.query;
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Producto insertado!!!');

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appId]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const updateActiveProduct = async (id, listIndex, active) => {
        try {
            await Api().put(`/products/${id}`, { active: !active }, {
                headers: {
                    'Authorization': 'Bearer ' + session.user.token
                }
            });
            let updatedList = products.map(item => {
                if (item.id === id) {
                    return { ...item, active: !item.active };
                }
                return item;
            });
            setProducts(updatedList);
        } catch (e) {
            setToastMessage(e.message);
            setOpenToast(true);
            if (e.response.status === 401)
                router.push('/login')
        }
    }

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await Api().get(`/products`, {
                headers: { 'Authorization': 'Bearer ' + session.user.token },
                params: { appId: appId }
            });
            setProducts(response.data);
            setShowForm(false);
        } catch (e) {
            setToastMessage(e.message);
            setOpenToast(true);
            if (e.response.status === 401)
                router.push('/login')
        }
        setLoading(false);
    }

    const handleSubmit = async (message) => {
        setLoading(true);
        await getProducts();
        setToastMessage(message);
        setOpenToast(true);
        setShowForm(false);
        setLoading(false);
    }

    const handleCloseForm = () => {
        setShowForm(!showForm);
    }

    return (
        <Layout title={`Productos - ${appId}`}>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20, marginTop: 20 }}>
                        <Button variant="text" onClick={() => router.push('/dashboard')}>
                            Dashboard
                            </Button>
                        <Typography color="textPrimary">{appId}</Typography>
                        <Typography color="textPrimary">Productos</Typography>
                    </Breadcrumbs>
                    <Button variant="contained" color="primary" onClick={handleCloseForm}>
                        Registrar Producto
                        </Button>
                    <Dialog className={classes.form} open={showForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Registrar Producto</DialogTitle>
                        {showForm && <ProductForm
                            session={session}
                            appId={appId}
                            handleSubmit={handleSubmit}
                            handleCloseForm={handleCloseForm} />}
                    </Dialog>
                    <ProductTable
                        products={products}
                        updateActiveProduct={updateActiveProduct}
                        appId={appId} />
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

export default Products;