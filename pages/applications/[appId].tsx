import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Api from '../../utils/api';
import TabPanel from '../../components/generic/TabPanel';
import ProductTab from '../../components/product/ProductTab';
import ApplicationCard from '../../components/application/ApplicationCard';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import { getSession, useSession } from 'next-auth/client';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));

const ApplicationView = () => {
    const [session] = useSession()
    const router = useRouter();
    const { appId } = router.query;
    const classes = useStyles();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);

    useEffect(() => {
        getApp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getApp = async () => {
        setLoading(true);
        try {
            const response = await Api().get(`/applications/${appId}`, {
                headers: {
                    //@ts-ignore
                    'Authorization': 'Bearer ' + session.user.token
                }
            });
            setApplication(response.data);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false);
    }

    return (
        <Layout>
            <Container>
                {application !== null &&
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20, marginTop: 20 }}>
                        <Button variant="text" onClick={() => router.push('/')}>
                            Dashboard
                    </Button>
                        <Button variant="text" onClick={() => router.push('/applications')}>
                            Aplicaciones
                    </Button>
                        <Typography color="textPrimary">{application ? application.name : ''}</Typography>
                    </Breadcrumbs>}
                <Grid container spacing={3} style={{ marginTop: 20 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        {application !== null && <ApplicationCard application={application} />}
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <Paper>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Estadisticas" {...a11yProps(0)} />
                            <Tab label="Productos" {...a11yProps(1)} />
                            <Tab label="Canales" {...a11yProps(2)} />
                        </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0}>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {application && <ProductTab
                            session={session}
                            appId={application.appId} />}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {/*<ChannelView appId={app.id} name={app.appId} />*/}
                    </TabPanel>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            props: {
                session
            }
        }
    }
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    }
}

export default ApplicationView;