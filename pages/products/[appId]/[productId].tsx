import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import Api from '../../../utils/api';
import ProductCard from '../../../components/product/ProductCard';
import LoaderBar from '../../../components/generic/LoaderBar';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import Layout from '../../../components/layouts/Layout';

const Product = ({ session }) => {
    const router = useRouter();
    const { appId, productId } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await Api().get(`/products/${productId}`, {
                //@ts-ignore
                headers: { 'Authorization': 'Bearer ' + session.user.token }
            });
            setProduct(response.data);
        } catch (e) {
            if (e.response.status === 401)
                router.push('/login')
        }
        setLoading(false);
    }

    return (
        <Layout title={`Producto - ${product ? product.name : ''}`}>
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 20, marginTop: 20 }}>
                <Button variant="text" onClick={() => router.push('/dashboard')}>
                    Dashboard
                    </Button>
                <Typography color="textPrimary">{appId}</Typography>
                <Button variant="text" onClick={() => router.push(`/applications/${appId}/products`)}>
                    Productos
                    </Button>
                <Typography color="textPrimary">{product ? product.name : ''}</Typography>
            </Breadcrumbs>
            <Grid container spacing={3} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid item xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
                    {product ? <ProductCard
                        session={session}
                        product={product}
                        getProduct={getProduct} /> : <LoaderBar />}
                </Grid>
            </Grid>
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

export default Product;