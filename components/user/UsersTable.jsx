import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import UserProfileTable from './UserProfileTable'
import moment from "moment";
import { Switch } from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.roles}
        </TableCell>
        <TableCell align="right">{row.company?.name || '-'}</TableCell>
        <TableCell align="right">
          <Switch
            checked={row.active}
            onChange={() => { props.updateActiveUser(row.id, row.active); }}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </TableCell>
        <TableCell align="right">{moment(row.createdAt).format(
          "Do MMM YYYY"
        )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <UserProfileTable user={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function UsersTable({ users, updateActiveUser }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell align="right">Estudio</TableCell>
            <TableCell align="right">Activo</TableCell>
            <TableCell align="right">Fecha de Creación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <Row key={row.id} row={row} updateActiveUser={updateActiveUser}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
