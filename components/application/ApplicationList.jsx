import React, { useEffect, useState } from 'react';
import { List, ListItem, makeStyles, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import Api from '../../utils/api';
import { useSession } from 'next-auth/client';
import ApplicationListItem from './ApplicationListItem';
import ApplicationForm from './ApplicationForm';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
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
                <ListItem button className={classes.nested} onClick={() => setShowForm(true)}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Nueva Aplicación" />
                </ListItem>
                <Divider />
                {applications.map((item, idx) => {
                    return (
                        <ApplicationListItem key={idx} application={item} />
                    );
                })}
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