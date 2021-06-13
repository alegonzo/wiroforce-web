import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ApplicationCard from '../../../components/application/ApplicationCard';
import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';
import { getSession, useSession } from 'next-auth/client';
import generateDashboard from '../../../utils/metabase';
import axios from 'axios';
import IframeResizer from 'iframe-resizer-react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));

const Analitics = ({ application, iframeUrl }) => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <Layout title={`Analitica - ${application.name}`}>
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
                <br />
                <div className={classes.root}>
                    <Grid container>
                        <Grid item md={12}>
                            <IframeResizer
                                src={iframeUrl} frameBorder={0}
                                style={{ width: '1px', minWidth: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        const appId = context.params.appId;
        let application = null;
        try {
            const response = await axios.get(`${process.env.API_INTERNAL_URL}/applications/${appId}`, {
                //@ts-ignore
                headers: { 'Authorization': 'Bearer ' + session.user.token }
            });
            application = response.data;
        } catch (e) {
            console.log(e.message);
        }
        const iframeUrl = session ? generateDashboard(
            { dashboard: 2 },
            {
                //@ts-ignore
                "id": session.user.company.id,
                "id_1": application.id
            }
        ) : null;
        return {
            props: {
                session,
                iframeUrl,
                application: application
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

export default Analitics;