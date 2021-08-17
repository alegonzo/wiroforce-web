import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import React from 'react'

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
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 15,
  },
  icon: {
    fontSize: 15,
    color: 'gray',
    marginRight: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
})

const DetailTable = ({ data }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} style={{ marginTop: '25px' }}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                component="th"
                scope="row"
                style={{ fontWeight: 'bold' }}
              >
                {item.label}
              </TableCell>
              <TableCell align="left">
                {item.text !== null ? item.text : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DetailTable
