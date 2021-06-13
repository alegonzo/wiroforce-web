import React, { useEffect, useState } from 'react';
import { List, ListItem, makeStyles, ListItemText, ListItemIcon } from '@material-ui/core';
import Api from '../../utils/api';
import { useSession } from 'next-auth/client';
import ApplicationListItem from './ApplicationListItem';
import ApplicationForm from './ApplicationForm';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    nested: {
        color: theme.palette.primary
    }
}));

const ApplicationList = () => {
    const [session, loading] = useSession();
    const [applications, setApplications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (!loading)
            getApplications();
    }, [loading]);

    const getApplications = async () => {
        try {
            const response = await Api().get('/applications', {
                //@ts-ignore
                headers: { 'Authorization': 'Bearer ' + session.user.token }
            });
            setApplications(response.data);
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <List component="div" disablePadding>
                {applications.map((item, idx) => {
                    return (
                        <ApplicationListItem key={idx} application={item} />
                    );
                })}
                <ListItem button  className={classes.nested} onClick={() => setShowForm(true)}>
                    <ListItemIcon color="primary">
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Nueva Aplicación" />
                </ListItem>
            </List>
            <ApplicationForm
                showForm={showForm}
                setShowForm={setShowForm}
                callback={getApplications}
            />
        </>
    );
}

export default ApplicationList;