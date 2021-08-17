import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}))

const CustomSelect = ({
  id,
  name,
  value,
  label,
  callback,
  items,
  errors,
  ...rest
}) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`${id}-${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-${name}-label`}
        id={id}
        name={name}
        value={value}
        onChange={callback}
        {...rest}
      >
        <MenuItem value="">Ninguno</MenuItem>
        {items.map((item, idx) => (
          <MenuItem key={idx} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {errors && errors[name] ? (
        <FormHelperText style={{ color: 'red' }}>{errors[name]}</FormHelperText>
      ) : null}
    </FormControl>
  )
}

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  errors: PropTypes.object,
}

export default CustomSelect
