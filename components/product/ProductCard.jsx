import {
    Button,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Edit, Close } from "@material-ui/icons";
import ProductForm from "./ProductForm";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
    },
});

const ProductCard = ({ product, getProduct, session }) => {
    const classes = useStyles();
    const [showForm, setShowForm] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Producto guardado");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenToast(false);
    };

    const active = product.active ? "Si" : "No";
    const offline = product.offline ? "Si" : "No";

    const handleSubmit = async (message) => {
        setToastMessage(message);
        setOpenToast(true);
        await getProduct();
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <Grid container justify="flex-start">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <Edit /> Editar
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                className={classes.form}
                open={showForm}
                onClose={() => setShowForm(!showForm)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Editar Producto
                </DialogTitle>
                <ProductForm
                    session={session}
                    appId={product.appId}
                    handleSubmit={handleSubmit}
                    handleCloseForm={handleCloseForm}
                    edit={true}
                    product={product}
                />
            </Dialog>
            <Grid
                container
                justify="flex-start"
                spacing={6}
                style={{ marginTop: 10 }}
            >
                {product.imageUrl && (
                    <Grid item>
                        <img
                            src={product.imageUrl}
                            height={80}
                            width={80}
                            alt="Imagen de producto"
                        />
                    </Grid>
                )}
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: "25px" }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        <TableRow key="Id">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Id
                            </TableCell>
                            <TableCell align="left">
                                {product.itemId}
                            </TableCell>
                        </TableRow>
                        <TableRow key="Nombre">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Nombre
                            </TableCell>
                            <TableCell align="left">{product.name}</TableCell>
                        </TableRow>
                        <TableRow key="Cantidad de recursos">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Cantidad de recursos
                            </TableCell>
                            <TableCell align="left">
                                {product.resourceAmount}
                            </TableCell>
                        </TableRow>
                        <TableRow key="Precio">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Precio
                            </TableCell>
                            <TableCell align="left">
                                {product.price} CUP
                            </TableCell>
                        </TableRow>
                        <TableRow key="Activo">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Activo
                            </TableCell>
                            <TableCell align="left">{active}</TableCell>
                        </TableRow>
                        <TableRow key="Offline">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Offline
                            </TableCell>
                            <TableCell align="left">{offline}</TableCell>
                        </TableRow>
                        <TableRow key="Version">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Versión
                            </TableCell>
                            <TableCell align="left">
                                {product.version}
                            </TableCell>
                        </TableRow>
                        <TableRow key="Descripcion">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Descripción
                            </TableCell>
                            <TableCell align="left">
                                {product.description}
                            </TableCell>
                        </TableRow>
                        <TableRow key="Fecha de registro">
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ fontWeight: "bold" }}
                            >
                                Fecha de registro
                            </TableCell>
                            <TableCell align="left">
                                {moment(product.createdAt).format("MMM Do YY")}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                open={openToast}
                autoHideDuration={6000}
                onClose={handleClose}
                message={toastMessage}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    );
};

export default ProductCard;
