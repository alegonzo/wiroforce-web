import React from 'react';
import { Button, makeStyles, Paper, Switch, } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
});

const columns = [
    {
        name: 'Nombre',
        maxWidth: 250
    },
    {
        name: 'Id',
        maxWidth: 250
    },
    {
        name: 'Activo',
        maxWidth: 250
    },
    {
        name: '',
        maxWidth: 40
    }
]

const ProductTable = ({ products, updateActiveProduct, appId }) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((item, idx) => <TableCell key={idx} style={{ width: item.maxWidth }}>{item.name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.itemId}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={row.active}
                                    onChange={() => { updateActiveProduct(row.id, idx, row.active); }}
                                    name="check-active-product"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Button color="primary" onClick={() => router.push(`/products/${appId}/${row.id}`)}>
                                    Gestionar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductTable;