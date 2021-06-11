import { makeStyles } from '@material-ui/core';
import Head from 'next/head'
import React, { useState } from 'react';
import Header from '../navigation/Header'
import SidebarDrawer from '../navigation/SidebarDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

const Layout = ({ children }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <Header
                handleDrawerToggle={handleDrawerToggle} />
            <SidebarDrawer
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

export default Layout;
