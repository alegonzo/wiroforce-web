import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const SearchField = ({ placeholder, setValue }) => {
  const classes = useStyles()
  const [search, setSearch] = useState('')

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          console.log(search)
          setValue(search)
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchField
