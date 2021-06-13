import React from 'react';
import Layout from '../../components/layouts/Layout';
import { Grid } from '@material-ui/core';
import { getSession, useSession } from 'next-auth/client';
import generateDashboard from '../../utils/metabase';
import IframeResizer from 'iframe-resizer-react';

const Dashboard = ({ iframeUrl }) => {
    const [session, loading] = useSession();

    if (typeof window !== 'undefined' && loading) return null

    if (session) {
        return (
            <Layout title="Dashboard">
                <Grid container>
                    <Grid item md={12}>
                        {<IframeResizer
                            src={iframeUrl} 
                            frameBorder={0}
                            style={{ width: '1px', minWidth: '100%' }}
                        />}
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