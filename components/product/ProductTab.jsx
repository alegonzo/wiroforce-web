import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogTitle, Grid, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import LoaderBar from '../generic/LoaderBar';
import Api from '../../utils/api';
import { Close } from '@material-ui/icons';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        minWidth: 900
    }
}));

const ProductTab = ({ appId, session }) => {
    const classes = useStyles();
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
            console.log(e.message);
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

    if (!loading) {
        return (
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item xs={12} sm={12} md={12}>
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
        );
    }
    return (
        <LoaderBar />
    );
}

export default ProductTab;