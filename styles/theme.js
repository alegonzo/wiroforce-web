import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#F76500',
      dark: '#BB2E00',
    },
    secondary: {
      main: '#186AFA',
    },
    background: {
      default: '#17171f',
    },
  },
  typography: {
    fontFamily: ['"Rubik"', 'sans-serif'].join(','),
  },
})

export default theme
