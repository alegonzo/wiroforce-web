import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Theme } from "@material-ui/core";
import { signOut, useSession } from "next-auth/client";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Header = ({ handleDrawerToggle }) => {
    const classes = useStyles();
    const [session, loading] = useSession();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    WiroForce
                </Typography>
                <Button
                    color="inherit"
                    onClick={() =>
                        signOut({
                            callbackUrl: `${window.location.origin}/wiroforce`,
                        })
                    }
                >
                    Logout({session.user.email})
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
