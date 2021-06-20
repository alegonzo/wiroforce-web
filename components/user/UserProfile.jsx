import {
    Button,
    Chip,
    Grid,
    makeStyles,
    colors,
    Tooltip,
    Box,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { ArrowBack, Edit, Help } from "@material-ui/icons";
import ProfileForm from "./ProfileForm";

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
    label: {
        marginBottom: 5,
        fontWeight: "bold",
    },
    text: {
        marginBottom: 15,
    },
    icon: {
        fontSize: 15,
        color: "gray",
        marginRight: 5,
    },
    content: {
        display: "flex",
        flexDirection: "row",
    },
});

const UserProfile = ({ user, getProfile }) => {
    const classes = useStyles();
    const [edit, setEdit] = useState(false);

    const updateProfile = async () => {
        await getProfile();
        setEdit(false);
    };

    return (
        <>
            {!edit && (
                <div style={{ width: "100%" }}>
                    <TableContainer
                        component={Paper}
                        style={{ marginTop: "25px" }}
                    >
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableBody>
                                <TableRow key="Id">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Nombre Completo
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.fullName}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Nombre">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Email
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Cantidad de recursos">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Estudio
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.company.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Precio">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Fecha de registro
                                    </TableCell>
                                    <TableCell align="start">
                                        {moment(user.createdAt).format(
                                            "MMM Do YY"
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Activo">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Direccion
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.address}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Offline">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Provincia
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.province}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Cantidad de recursos">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Telefono
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.phone}
                                    </TableCell>
                                </TableRow>
                                <TableRow key="Cantidad de recursos">
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Nit ONAT
                                    </TableCell>
                                    <TableCell align="start">
                                        {user.nitOnat}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEdit(true)}
                    >
                        <Edit /> Editar
                    </Button>
                </div>
            )}

            {edit && (
                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <Box p={2} style={{ width: "100%" }}>
                            <Grid container>
                                <Grid item md={12} xl={12} xs={12}>
                                    <ProfileForm
                                        edit
                                        user={user}
                                        setEdit={setEdit}
                                        getProfile={getProfile}
                                        updateProfile={updateProfile}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default UserProfile;
