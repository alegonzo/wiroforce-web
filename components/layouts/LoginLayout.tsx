import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const LoginLayout = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
}

export default LoginLayout;
