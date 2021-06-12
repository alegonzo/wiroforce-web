import { Button, Dialog, DialogTitle, Grid, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Edit, Close } from '@material-ui/icons';
import ProductForm from './ProductForm';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    }
});

const ProductCard = ({ product, getProduct, session }) => {
    const classes = useStyles();
    const [showForm, setShowForm] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Producto guardado');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    const bull = <span className={classes.bullet}>•</span>;
    const active = product.active ? 'Si' : 'No';

    const handleSubmit = async (message) => {
        setToastMessage(message);
        setOpenToast(true);
        await getProduct();
        setShowForm(false);
    }

    const handleCloseForm = () => {
        setShowForm(!showForm);
    }
 
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography gutterBottom variant="h3">
                        {product.name}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
                        <Edit /> Editar
                    </Button>
                    <Dialog className={classes.form} open={showForm} onClose={() => setShowForm(!showForm)} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Editar Producto</DialogTitle>
                        <ProductForm
                            session={session}
                            appId={product.appId}
                            handleSubmit={handleSubmit}
                            handleCloseForm={handleCloseForm}
                            edit={true}
                            product={product} />
                    </Dialog>
                    <Grid
                        container
                        justify="flex-start"
                        spacing={6}
                        style={{ marginTop: 15 }}
                    >
                        {product.image &&
                            <Grid item>
                                <img src={`/${product.imageUrl}`} height={80} width={80} alt="Imagen de producto" />
                            </Grid>
                        }
                        <Grid item>
                            <Typography variant="body1" component="h2">
                                Id {bull} {product.itemId}
                            </Typography>
                            <Typography variant="body1" component="h2">
                                Cantidad de recursos {bull} {product.resourceAmount}

                            </Typography>
                            <Typography variant="body1" component="h2">
                                Precio {bull} {product.price} CUP
                                    </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" component="h2">
                                Activo {bull} {active}
                            </Typography>
                            <Typography variant="body1" component="h2">
                                Versión {bull} {product.version}
                            </Typography>
                            <Typography variant="body1" component="h2">
                                Descripción {bull} {product.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="flex-start"
                        spacing={6}
                    >
                        <Grid item>
                            <Typography variant="caption" component="h2">
                                Fecha de registro {bull} {moment(product.createdAt).format("MMM Do YY")}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
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
        </>
    );
}

export default ProductCard;