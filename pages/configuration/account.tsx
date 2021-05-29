import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Button, Container, Typography } from '@material-ui/core';
import Api from '../../utils/api';
import UserProfile from '../../components/user/UserProfile';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/Layout';
import { getSession, useSession } from 'next-auth/client';

const AccountConfig = ({ session }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProfile = async () => {
        setLoading(true);
        try {
            //@ts-ignore
            const response = await Api().get(`/users/${session.user.id}`, {
                //@ts-ignore
                headers: { 'Authorization': 'Bearer ' + session.user.token }
            });
            const user = { ...response.data, ...response.data.profile };
            delete user['profile'];
            setUser(user);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false);
    }

    return (
        <Layout>
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20, marginTop: 20, marginLeft: 20 }}>
                <Button variant="text" onClick={() => router.push('/dashboard')}>
                    Dashboard
                </Button>
                <Typography color="textPrimary">Cuenta</Typography>
            </Breadcrumbs>
            <Container>
                {user ? <UserProfile user={user} getProfile={getProfile} /> : 'Cargando...'}
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session)
        return { props: { session } }
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    }
}

export default AccountConfig;