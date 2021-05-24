import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    Dashboard as DashboardIcon,
    Apps as AppsIcon,
    People,
    AttachMoney,
    Settings,
    ExpandLess,
    ExpandMore,
    AccountBox,
    Assessment
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Collapse, Drawer, Hidden, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    nested: {
        paddingLeft: theme.spacing(4),
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

const SidebarDrawer = (props) => {
    const { window } = props;
    const classes = useStyles();
    const router = useRouter();
    const theme = useTheme();
    const [config, setConfig] = useState(false);

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <ListItem button onClick={() => router.push('/dashboard')}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
                <ListItem button onClick={() => router.push('/applications')}>
                    <ListItemIcon><AppsIcon /></ListItemIcon>
                    <ListItemText primary={'Aplicaciones'} />
                </ListItem>
                <ListItem button onClick={() => setConfig(!config)}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Configuración" />
                    {config ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={config} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => router.push('/configuration/account')}>
                            <ListItemIcon>
                                <AccountBox />
                            </ListItemIcon>
                            <ListItemText primary="Cuenta" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={() => console.log('asd')}>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <ListItemText primary="Reportes" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default SidebarDrawer;