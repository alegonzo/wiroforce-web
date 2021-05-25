import React from 'react';
import Layout from '../../components/layouts/Layout';
import { Grid } from '@material-ui/core';
import { getSession, useSession } from 'next-auth/client';
import generateDashboard from '../../utils/metabase';

const Dashboard = ({ iframeUrl }) => {
    const [session, loading] = useSession();

    if (typeof window !== 'undefined' && loading) return null

    if (session) {
        return (
            <Layout>
                <Grid container>
                    <Grid item md={12}>
                        <iframe
                            src={iframeUrl}
                            frameBorder="0"
                            width="100%"
                            height="600"
                        ></iframe>
                    </Grid>
                </Grid>
            </Layout>
        );
    }

    return <p>Access Denied</p>
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const iframeUrl = session ? generateDashboard(
        { dashboard: 1 },
        //@ts-ignore
        { "id": session.user.company.id }
    ) : null;

    if (session) {
        return {
            props: {
                session,
                iframeUrl
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


export default Dashboard;