import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#F76500'
        },
        secondary: {
            main: '#186AFA'
        },
        background: {
            default: '#2e353b'
        }
    },
});

export default theme;