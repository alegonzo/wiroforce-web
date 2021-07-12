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
                        <TableCell align="left">
                            {user.fullName}
                        </TableCell>
                    </TableRow>
                    <TableRow key="email">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Email
                                    </TableCell>
                        <TableCell align="left">
                            {user.email}
                        </TableCell>
                    </TableRow>
                    <TableRow key="estudio">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Estudio
                                    </TableCell>
                        <TableCell align="left">
                            {user.company.name}
                        </TableCell>
                    </TableRow>
                    <TableRow key="fecha">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Fecha de registro
                                    </TableCell>
                        <TableCell align="left">
                            {moment(user.createdAt).format(
                                "MMM Do YY"
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow key="direccion">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Dirección
                                    </TableCell>
                        <TableCell align="left">
                            {user.address}
                        </TableCell>
                    </TableRow>
                    <TableRow key="provincia">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Provincia
                                    </TableCell>
                        <TableCell align="left">
                            {user.province}
                        </TableCell>
                    </TableRow>
                    <TableRow key="telefono">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Teléfono
                                    </TableCell>
                        <TableCell align="left">
                            {user.phone}
                        </TableCell>
                    </TableRow>
                    <TableRow key="nitOnat">
                        <TableCell
                            component="th"
                            scope="row"
                            style={{ fontWeight: "bold" }}
                        >
                            Nit ONAT
                                    </TableCell>
                        <TableCell align="left">
                            {user.nitOnat}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserProfileTable;
