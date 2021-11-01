import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const CustomTable = ({
  data,
  columns,
  paginated = true,
  pagination: { count, page, size, setPage, setSize },
}) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((item, idx) => (
              <TableCell key={idx} style={{ width: item.maxWidth }}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((item, _idx) => {
                if (item.custom) {
                  return (
                    <TableCell key={_idx}>{item.custom(row, idx)}</TableCell>
                  )
                } else if (item.id.includes('.')) {
                  const pieces = item.id.split('.')
                  return (
                    <TableCell key={_idx}>
                      {row[pieces[0]][pieces[1]]}
                    </TableCell>
                  )
                } else {
                  return <TableCell key={_idx}>{row[item.id]}</TableCell>
                }
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {paginated && (
            <TableRow>
              <TablePagination
                count={count}
                page={page}
                rowsPerPage={size}
                rowsPerPageOptions={[5, 10, 20]}
                onPageChange={(e, page) => {
                  setPage(page)
                }}
                onRowsPerPageChange={(e) => {
                  setSize(e.target.value)
                }}
              />
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default CustomTable
