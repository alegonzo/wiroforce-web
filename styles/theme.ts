import { createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#F76500",
            dark: "#BB2E00",
        },
        secondary: {
            main: "#186AFA",
        },
        background: {
            default: "#21222D",
        },
    },
});

export default theme;