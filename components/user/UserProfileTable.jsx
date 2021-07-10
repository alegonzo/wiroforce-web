import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import moment from "moment";


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

const UserProfileTable = ({ user }) => {
    const classes = useStyles();

    return (

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
                            Dirección
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
                            Teléfono
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
    );
};

export default UserProfileTable;
